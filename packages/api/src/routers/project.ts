import fs from "fs/promises";

import { eq } from "@repo/db/drizzle";
import { conductorTypes } from "@repo/db/schemas/conductorTypes";
import { projects } from "@repo/db/schemas/projects";
import { towerGeometries } from "@repo/db/schemas/towerGeometries";
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

import { publicProcedure, router } from "../trpc";

import buildCircuit from "@/helpers/buildCircuit";

export default router({
    getAll: publicProcedure
        .input(getAllProjectsSchema)
        .query(({ ctx: { db } }) => {
            const allProjects = db.query.projects.findMany();
            return allProjects;
        }),
    getById: publicProcedure
        .input(getProjectByIdSchema)
        .query(async ({ input, ctx: { db } }) => {
            const project = await db.query.projects.findFirst({
                with: {
                    sources: true,
                    transmissionLines: true,
                },
                where: eq(projects.id, input.id),
            });
            if (!project) throw Error("Can't find project");

            return project;
        }),
    create: publicProcedure
        .input(createProjectSchema)
        .mutation(async ({ input, ctx: { db } }) => {
            const [newProject] = await db
                .insert(projects)
                .values(input)
                .returning();
            if (!newProject) throw Error("Can't create project");

            return newProject;
        }),
    update: publicProcedure
        .input(updateProjectSchema)
        .mutation(async ({ input, ctx: { db } }) => {
            const [updatedProject] = await db
                .update(projects)
                .set(input)
                .where(eq(projects.id, input.id))
                .returning();
            if (!updatedProject) throw Error("Can't update project");

            return updatedProject;
        }),
    delete: publicProcedure
        .input(deleteProjectSchema)
        .mutation(async ({ input, ctx: { db } }) => {
            const [deletedProject] = await db
                .delete(projects)
                .where(eq(projects.id, input.id))
                .returning();
            if (!deletedProject) throw Error("Can't delete project");

            return deletedProject;
        }),

    solve: publicProcedure
        .input(solveProjectSchema)
        .query(async ({ input, ctx: { db } }) => {
            const project = await db.query.projects.findFirst({
                where: eq(projects.id, input.id),
                with: {
                    transmissionLines: {
                        with: {
                            conductors: {
                                with: {
                                    type: true,
                                },
                            },
                            fromSource: true,
                            toSource: true,
                            towers: {
                                with: {
                                    geometry: true,
                                },
                            },
                        },
                    },
                    sources: true,
                },
            });

            /*
            SELECT DISTINCT tower_geometry.* FROM tower_geometry 
            LEFT JOIN transmission_tower ON transmission_tower.geometryId = tower_geometry.id 
            LEFT JOIN transmission_line ON transmission_line.id = transmission_tower.transmissionLineId 
            WHERE projectId = "a8815e72-0738-408d-a1d8-eb0e72995f43";
            */
            const uniqueTowerGeometries =
                await db.query.towerGeometries.findFirst({
                    with: {
                        conductors: true,
                    },
                    where: eq(towerGeometries.id, 1),
                });
            const uniqueConductorTypes =
                await db.query.conductorTypes.findFirst({
                    with: {
                        conductors: true,
                    },
                    where: eq(conductorTypes.id, 1),
                });
            const faultStudy = await buildCircuit(
                project,
                [uniqueTowerGeometries],
                [uniqueConductorTypes]
            );
            const results = faultStudy.worstCase();
            return results;
        }),
    import: publicProcedure.mutation(async ({ ctx: { electron, db } }) => {
        if (!electron) {
            throw new Error("Not in electron context");
        }
        const currentBrowser = electron.browserWindow;
        if (!currentBrowser) {
            throw new Error("No browser window found");
        }
        const openDialogReturn = await electron.dialog.showOpenDialog(
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
            const input = importProjectSchema.parse(contents);
            // TODO: check if exists and which version is more up to date, then prompt user if they want to replace it.
            const [project] = await db
                .insert(projects)
                .values(input)
                .returning();

            return project;
        }

        return null;
    }),
    export: publicProcedure
        .input(exportProjectSchema)
        .mutation(async ({ input, ctx: { electron, db } }) => {
            if (!electron) {
                throw new Error("Not in electron context");
            }
            const currentBrowser = electron.browserWindow;
            if (!currentBrowser) {
                throw new Error("No browser window found");
            }
            const saveDialogReturn = await electron.dialog.showSaveDialog(
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
                const project = await db.query.projects.findFirst({
                    where: eq(projects.id, input.id),
                    with: {
                        sources: true,
                        transmissionLines: {
                            with: {
                                towers: true,
                                conductors: true,
                            },
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
