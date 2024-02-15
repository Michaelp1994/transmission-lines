import fs from "fs/promises";

import ConductorType from "@repo/db/models/ConductorType.model";
import Project from "@repo/db/models/Project.model";
import TowerGeometry from "@repo/db/models/TowerGeometry.model";
import TransmissionLine from "@repo/db/models/TransmissionLine.model";
import TransmissionTower from "@repo/db/models/TransmissionTower.model";
import {
    createProjectSchema,
    deleteProjectSchema,
    exportProjectSchema,
    getAllProjectsSchema,
    getProjectByIdSchema,
    importProjectSchema,
    solveProjectSchema,
    updateProjectSchema,
} from "@repo/validators/schemas/Project.schema";

import buildCircuit from "@/helpers/buildCircuit";

import { publicProcedure, router } from "../trpc";

export default router({
    getAll: publicProcedure
        .input(getAllProjectsSchema)
        .query(({ ctx }) => ctx.dataSource.getRepository(Project).find()),
    getById: publicProcedure
        .input(getProjectByIdSchema)
        .query(async ({ input, ctx }) => {
            const projectRepository = ctx.dataSource.getRepository(Project);
            const project = await projectRepository.findOneOrFail({
                relations: {
                    sources: true,
                    transmissionLines: true,
                },
                where: {
                    id: input.id,
                },
            });

            return project;
        }),
    create: publicProcedure
        .input(createProjectSchema)
        .mutation(async ({ input, ctx }) => {
            const projectRepository = ctx.dataSource.getRepository(Project);
            const project = await projectRepository.create(input);
            return project.save();
        }),
    update: publicProcedure
        .input(updateProjectSchema)
        .mutation(async ({ input, ctx }) =>
            ctx.dataSource
                .getRepository(Project)
                .update({ id: input.id }, input)
        ),
    delete: publicProcedure
        .input(deleteProjectSchema)
        .mutation(async ({ input, ctx }) =>
            ctx.dataSource.getRepository(Project).delete({ id: input.id })
        ),

    solve: publicProcedure
        .input(solveProjectSchema)
        .query(async ({ input, ctx }) => {
            const project = await ctx.dataSource
                .getRepository(Project)
                .findOneOrFail({
                    where: { id: input.id },
                    order: {
                        transmissionLines: {
                            towers: {
                                id: "ASC",
                            },
                        },
                    },
                    relations: {
                        sources: true,
                        transmissionLines: {
                            conductors: {
                                type: true,
                            },
                            fromSource: true,
                            toSource: true,
                            towers: {
                                geometry: true,
                            },
                        },
                    },
                });
            /*
            SELECT DISTINCT tower_geometry.* FROM tower_geometry 
            LEFT JOIN transmission_tower ON transmission_tower.geometryId = tower_geometry.id 
            LEFT JOIN transmission_line ON transmission_line.id = transmission_tower.transmissionLineId 
            WHERE projectId = "a8815e72-0738-408d-a1d8-eb0e72995f43";
            */
            const uniqueTowerGeometries = await ctx.dataSource
                .getRepository(TowerGeometry)
                .findOneOrFail({
                    where: {
                        id: 1,
                    },
                    relations: {
                        conductors: true,
                    },
                });
            const uniqueConductorTypes = await ctx.dataSource
                .getRepository(ConductorType)
                .findOneOrFail({
                    where: {
                        id: 1,
                    },
                });
            const faultStudy = await buildCircuit(
                project,
                [uniqueTowerGeometries],
                [uniqueConductorTypes]
            );
            const results = faultStudy.worstCase();
            return results;
        }),
    import: publicProcedure.mutation(async ({ ctx }) => {
        const currentBrowser = ctx.electron.browserWindow;
        if (!currentBrowser) {
            throw new Error("No browser window found");
        }
        const openDialogReturn = await ctx.electron.dialog.showOpenDialog(
            currentBrowser,
            {
                properties: ["openFile"],
                filters: [
                    { name: "Project", extensions: ["study"] },
                    { name: "All Files", extensions: ["*"] },
                ],
            }
        );
        if (!openDialogReturn.canceled) {
            const fileName = openDialogReturn.filePaths[0];
            if (!fileName) throw Error("Can't get file name");
            const file = await fs.readFile(fileName);
            const contents = JSON.parse(file.toString());
            const project = importProjectSchema.parse(contents);
            // TODO: check if exists and which version is more up to date, then prompt user if they want to replace it.
            const projectRepository = ctx.dataSource.getRepository(Project);
            await projectRepository.save(project);

            return project.id;
        }

        return null;
    }),
    export: publicProcedure
        .input(exportProjectSchema)
        .mutation(async ({ input, ctx }) => {
            const currentBrowser = ctx.electron.browserWindow;
            if (!currentBrowser) {
                throw new Error("No browser window found");
            }
            const saveDialogReturn = await ctx.electron.dialog.showSaveDialog(
                currentBrowser,
                {
                    filters: [
                        { name: "Project", extensions: ["study"] },
                        { name: "All Files", extensions: ["*"] },
                    ],
                }
            );
            if (!saveDialogReturn.canceled) {
                const fileName = saveDialogReturn.filePath!;
                const projectRepository = ctx.dataSource.getRepository(Project);
                const project = await projectRepository.findOne({
                    where: { id: input.id },
                    relations: {
                        sources: true,
                        transmissionLines: {
                            towers: true,
                            conductors: true,
                        },
                    },
                });
                // TODO: maybe include versioning, conductor types and tower geometries used in the project.
                const fileContents = JSON.stringify(project, undefined, 2);
                await fs.writeFile(fileName, fileContents);
                return true;
            }
            return null;
        }),
});
