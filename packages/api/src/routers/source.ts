import { eq } from "@repo/db/drizzle";
import { sources } from "@repo/db/schemas/sources";
import {
    createSourceSchema,
    deleteSourceSchema,
    getAllSourcesByProjectIdSchema,
    getAllSourcesSchema,
    getSourceByIdSchema,
    updateSourceElectricalSchema,
    updateSourceGeneralSchema,
    updateSourcePositionsSchema,
} from "@repo/validators/schemas/Source.schema";
import { publicProcedure, router } from "../trpc";
import calculateZPhaseComponents from "../helpers/calculateZPhaseComponents";
import calculateZSequenceComponents from "../helpers/calculateZSequenceComponents";

export default router({
    getAll: publicProcedure
        .input(getAllSourcesSchema)
        .query(async ({ ctx: { db } }) => {
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
    getPhaseComponents: publicProcedure
        .input(getSourceByIdSchema)
        .query(async ({ input, ctx: { db } }) => {
            const source = await db.query.sources.findFirst({
                where: eq(sources.id, input.id),
            });

            if (!source) {
                throw new Error("Can't find source");
            }

            const { z0, z1, z2 } = calculateZSequenceComponents({
                voltage: source.voltage * 1000,
                x1r1: source.x1r1,
                isc1: source.isc1,
                x0r0: source.x0r0,
                isc3: source.isc3,
            });

            const zPhaseMatrix = calculateZPhaseComponents({ z0, z1, z2 });
            const outputMatrix = zPhaseMatrix.toArray();

            return {
                phaseMatrix: outputMatrix,
                z0: { re: z0.re, im: z0.im },
                z1: { re: z1.re, im: z1.im },
                z2: { re: z2.re, im: z2.im },
            };
        }),
    getById: publicProcedure
        .input(getSourceByIdSchema)
        .query(async ({ input, ctx: { db } }) => {
            const source = await db.query.sources.findFirst({
                where: eq(sources.id, input.id),
            });

            if (!source) {
                throw new Error("Can't find source");
            }

            return source;
        }),
    create: publicProcedure
        .input(createSourceSchema)
        .mutation(async ({ input, ctx: { db } }) => {
            const [newSource] = await db
                .insert(sources)
                .values(input)
                .returning();

            if (!newSource) {
                throw new Error("Can't create source");
            }

            return newSource;
        }),
    updateGeneral: publicProcedure
        .input(updateSourceGeneralSchema)
        .mutation(async ({ input, ctx: { db } }) => {
            const [updatedSource] = await db
                .update(sources)
                .set(input)
                .where(eq(sources.id, input.id))
                .returning();

            if (!updatedSource) {
                throw new Error("Can't update source");
            }

            return updatedSource;
        }),
    updateElectrical: publicProcedure
        .input(updateSourceElectricalSchema)
        .mutation(async ({ input, ctx: { db } }) => {
            const [updatedSource] = await db
                .update(sources)
                .set(input)
                .where(eq(sources.id, input.id))
                .returning();

            if (!updatedSource) {
                throw new Error("Can't update source");
            }

            return updatedSource;
        }),
    updatePosition: publicProcedure
        .input(updateSourcePositionsSchema)
        .mutation(async ({ input, ctx: { db } }) => {
            input.forEach(async (source) => {
                await db
                    .update(sources)
                    .set({ x: source.x, y: source.y })
                    .where(eq(sources.id, source.id));
            });
            // throw new Error("Not implemented");
        }),
    delete: publicProcedure
        .input(deleteSourceSchema)
        .mutation(async ({ input, ctx: { db } }) => {
            const [deletedSource] = await db
                .delete(sources)
                .where(eq(sources.id, input.id))
                .returning();

            if (!deletedSource) {
                throw new Error("Can't delete source");
            }

            return deletedSource;
        }),
});
