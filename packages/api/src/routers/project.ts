import fs from "fs/promises";
import {
    createProjectSchema,
    getProjectSchema,
    openProjectSchema,
} from "@repo/validators/schemas/Project.schema";
import { publicProcedure, router } from "../trpc";

// import buildCircuit from "@/helpers/buildCircuit";

export default router({
    getProject: publicProcedure
        .input(getProjectSchema)
        .query(async ({ ctx }) => {
            return ctx.store.project;
        }),
    open: publicProcedure.mutation(async ({ ctx }) => {
        if (!ctx.electron) {
            throw new Error("Not in electron context");
        }
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

            if (!fileName) {
                throw new Error("Can't get file name");
            }
            const file = await fs.readFile(fileName);
            const contents = JSON.parse(file.toString());
            const input = openProjectSchema.parse(contents);
            // TODO: check if exists and which version is more up to date, then prompt user if they want to replace it.

            ctx.store.project = input;

            return ctx.store.project;
        }

        return null;
    }),
    create: publicProcedure
        .input(createProjectSchema)
        .mutation(async ({ input, ctx }) => {
            ctx.store.project = input;
            return input;
        }),
    close: publicProcedure.mutation(async ({ input, ctx }) => {
        ctx.store.project = null;
        return input;
    }),
    save: publicProcedure.mutation(async ({ ctx }) => {
        if (!ctx.store.project) {
            throw new Error("Can't save without project");
        }
    }),

    saveAs: publicProcedure.mutation(async ({ ctx }) => {
        if (!ctx.store.project) {
            throw new Error("Can't save without project");
        }
        if (!ctx.electron) {
            throw new Error("Not in electron context");
        }
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
            const fileName = saveDialogReturn.filePath;

            // TODO: maybe include versioning, conductor types and tower geometries used in the project.
            const fileContents = JSON.stringify(
                ctx.store.project,
                undefined,
                2
            );

            await fs.writeFile(fileName, fileContents);

            return true;
        }

        return null;
    }),
});
