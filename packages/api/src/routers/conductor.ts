import { eq } from "@repo/db/drizzle";
import { transmissionConductors } from "@repo/db/schemas/transmissionConductors";
import { generateConductorsSchema } from "@repo/validators";
import {
    createConductorSchema,
    deleteConductorSchema,
    getAllConductorsByLineIdSchema,
    getAllConductorsSchema,
    getConductorByIdSchema,
    updateConductorSchema,
} from "@repo/validators/schemas/Conductor.schema";
import { publicProcedure, router } from "../trpc";
import generateConductors from "@/helpers/generateConductors";

export default router({
    getAll: publicProcedure
        .input(getAllConductorsSchema)
        .query(async ({ ctx: { db } }) => {
            const allConductors =
                await db.query.transmissionConductors.findMany();

            return allConductors;
        }),
    getAllByLineId: publicProcedure
        .input(getAllConductorsByLineIdSchema)
        .query(async ({ input, ctx: { db } }) => {
            const conductors = await db.query.transmissionConductors.findMany({
                where: eq(transmissionConductors.lineId, input.lineId),
                with: {
                    type: true,
                },
            });

            return conductors;
        }),
    getById: publicProcedure
        .input(getConductorByIdSchema)
        .query(async ({ input, ctx: { db } }) => {
            const conductorType =
                await db.query.transmissionConductors.findFirst({
                    where: eq(transmissionConductors.id, input.id),
                });

            if (!conductorType) {
                throw new Error("Can't find conductor");
            }

            return conductorType;
        }),

    create: publicProcedure
        .input(createConductorSchema)
        .mutation(async ({ input, ctx: { db } }) => {
            const [newConductor] = await db
                .insert(transmissionConductors)
                .values(input)
                .returning();

            if (!newConductor) {
                throw new Error("Can't create conductor");
            }

            return newConductor;
        }),
    generate: publicProcedure
        .input(generateConductorsSchema)
        .mutation(async ({ input, ctx: { db } }) => {
            const conductors = generateConductors(input);

            const createdConductors = await db
                .insert(transmissionConductors)
                .values(conductors)
                .returning();

            return createdConductors;
        }),
    update: publicProcedure
        .input(updateConductorSchema)
        .mutation(async ({ input, ctx: { db } }) => {
            const [updatedConductor] = await db
                .update(transmissionConductors)
                .set({ ...input })
                .where(eq(transmissionConductors.id, input.id))
                .returning();

            if (!updatedConductor) {
                throw new Error("Can't update conductor");
            }

            return updatedConductor;
        }),
    delete: publicProcedure
        .input(deleteConductorSchema)
        .mutation(async ({ input, ctx: { db } }) => {
            const [deletedConductor] = await db
                .delete(transmissionConductors)
                .where(eq(transmissionConductors.id, input.id))
                .returning();

            if (!deletedConductor) {
                throw new Error("Can't delete conductor");
            }

            return deletedConductor;
        }),
});
