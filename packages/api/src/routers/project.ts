import { createProject, openProject } from "@repo/db";

import openFileDialog from "../helpers/openFileDialog";
import saveFileDialog from "../helpers/saveFileDialog";
import { projectProcedure, publicProcedure, router } from "../trpc";

// import buildCircuit from "@/helpers/buildCircuit";

export default router({
    isOpen: publicProcedure.query(async ({ ctx }) => {
        if (!ctx.project.db) {
            return false;
        }
        if (ctx.project.db.$client.open) {
            return true;
        }
        return false;
    }),
    filePath: publicProcedure.query(({ ctx }) => {
        return ctx.project.db?.$client.name;
    }),
    open: publicProcedure.mutation(async ({ ctx }) => {
        const fileName = await openFileDialog(ctx);

        const db = openProject(fileName);
        ctx.project.db = db;

        return true;
    }),
    create: publicProcedure
        // .input(createProjectSchema)
        .mutation(async ({ ctx }) => {
            const fileName = await saveFileDialog(ctx);

            const db = await createProject(fileName);
            ctx.project.db = db;
            return true;
        }),
    close: publicProcedure.mutation(async ({ ctx }) => {
        ctx.project.db?.$client.close();
        ctx.project.db = null;
    }),
    save: projectProcedure.mutation(async ({ ctx }) => {
        // TODO
        return true;
    }),

    saveAs: projectProcedure.mutation(async ({ ctx }) => {
        const fileName = await saveFileDialog(ctx);

        // TODO: maybe include versioning, conductor types and tower geometries used in the project.
        await ctx.project.db?.$client.backup(fileName);
        ctx.project.db?.$client.close();
        ctx.project.db = null;
        const db = openProject(fileName);

        ctx.project.db = db;
    }),
});
