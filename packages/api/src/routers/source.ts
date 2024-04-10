import { eq } from "@repo/db/drizzle";
import { sources } from "@repo/db/schemas/sources";
import {
    createSourceSchema,
    deleteSourceSchema,
    getAllSourcesByProjectIdSchema,
    getAllSourcesSchema,
    getSourceByIdSchema,
    updateSourceSchema,
} from "@repo/validators/schemas/Source.schema";

import { publicProcedure, router } from "../trpc";

export default router({
    getAll: publicProcedure
        .input(getAllSourcesSchema)
        .query(async ({ ctx: { db }, input }) => {
            const allSources = await db.query.sources.findMany();

            return allSources;
        }),
    getAllByProjectId: publicProcedure
        .input(getAllSourcesByProjectIdSchema)
        .query(async ({ ctx: { db }, input }) => {
            const allSources = await db.query.sources.findMany({
                where: eq(sources.projectId, input.projectId),
            });

            return allSources;
        }),
    getById: publicProcedure
        .input(getSourceByIdSchema)
        .query(async ({ input, ctx: { db } }) => {
            const source = await db.query.sources.findFirst({
                where: eq(sources.id, input.id),
            });
            if (!source) throw Error("Can't find source");

            return source;
        }),
    create: publicProcedure
        .input(createSourceSchema)
        .mutation(async ({ input, ctx: { db } }) => {
            const [newSource] = await db
                .insert(sources)
                .values(input)
                .returning();
            if (!newSource) throw Error("Can't create source");

            return newSource;
        }),
    update: publicProcedure
        .input(updateSourceSchema)
        .mutation(async ({ input, ctx: { db } }) => {
            const [updatedSource] = await db
                .update(sources)
                .set(input)
                .where(eq(sources.id, input.id))
                .returning();
            if (!updatedSource) throw Error("Can't update source");

            return updatedSource;
        }),
    delete: publicProcedure
        .input(deleteSourceSchema)
        .mutation(async ({ input, ctx: { db } }) => {
            const [deletedSource] = await db
                .delete(sources)
                .where(eq(sources.id, input.id))
                .returning();
            if (!deletedSource) throw Error("Can't delete source");

            return deletedSource;
        }),
});
