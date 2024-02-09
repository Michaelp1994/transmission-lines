import fs from "fs/promises";

import Source from "@repo/db/models/Source.model";
import TransmissionLine from "@repo/db/models/TransmissionLine.model";
import {
    CreateProjectInput,
    createProjectSchema,
} from "@repo/validators/schemas/Project.schema";

import { publicProcedure, router } from "../trpc";

export default router({
    openProject: publicProcedure.mutation(async ({ ctx }) => {
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
            if (!fileName) throw Error("can't get file name");
            const file = await fs.readFile(fileName);
            const contents = JSON.parse(file.toString());
            await ctx.memoryDb.destroy();
            await ctx.memoryDb.initialize();
            const project = createProjectSchema.parse(contents);
            await Source.insert(project.sources);
            const transmissionLineRepository =
                ctx.memoryDb.getRepository(TransmissionLine);
            for await (const transmissionLine of project.transmissionLines) {
                await transmissionLineRepository.save(transmissionLine);
            }
            return contents as CreateProjectInput;
        }

        return null;
    }),
    saveProject: publicProcedure.mutation(async ({ ctx }) => {
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
            const sourceRepository = ctx.memoryDb.getRepository(Source);
            const sources = await sourceRepository.find();
            const transmissionLineRepository =
                ctx.memoryDb.getRepository(TransmissionLine);
            const transmissionLines = await transmissionLineRepository.find({
                relations: ["towers", "conductors"],
            });
            await fs.writeFile(
                fileName,
                JSON.stringify(
                    {
                        sources,
                        transmissionLines,
                    },
                    undefined,
                    2
                )
            );
            return true;
        }
        return null;
    }),
});
