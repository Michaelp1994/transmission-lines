import { count, eq } from "@repo/db/drizzle";
import { conductorTypes } from "@repo/db/schemas/conductorTypes";
import {
    createConductorTypeSchema,
    deleteConductorTypeSchema,
    getAllConductorTypesSchema,
    getConductorTypeByIdSchema,
    updateConductorTypeSchema,
} from "@repo/validators/schemas/ConductorType.schema";

import { publicProcedure, router } from "../trpc";

export default router({
    getAll: publicProcedure
        .input(getAllConductorTypesSchema)
        .query(async ({ ctx: { db }, input }) => {
            const findOptions = input && {
                limit: input.pageSize,
                offset: input.pageIndex * input.pageSize,
            };
            const allConductorTypes =
                await db.query.conductorTypes.findMany(findOptions);
            return allConductorTypes;
        }),
    getCount: publicProcedure
        .input(getAllConductorTypesSchema)
        .query(async ({ ctx: { db }, input }) => {
            const [totalCount] = await db
                .select({
                    value: count(),
                })
                .from(conductorTypes);
            if (!totalCount) throw Error("Could not get totalCount");
            const pageCount = input
                ? Math.ceil(totalCount.value / input.pageSize)
                : -1;
            return pageCount;
        }),
    getById: publicProcedure
        .input(getConductorTypeByIdSchema)
        .query(async ({ input, ctx: { db } }) => {
            const conductorType = await db.query.conductorTypes.findFirst({
                where: eq(conductorTypes.id, input.id),
            });
            if (!conductorType) throw Error("Can't find conductor type");
            return conductorType;
        }),
    create: publicProcedure
        .input(createConductorTypeSchema)
        .mutation(async ({ input, ctx: { db } }) => {
            const [newConductorType] = await db
                .insert(conductorTypes)
                .values(input)
                .returning();
            if (!newConductorType) throw Error("Can't create conductor type");

            return newConductorType;
        }),
    update: publicProcedure
        .input(updateConductorTypeSchema)
        .mutation(async ({ input, ctx: { db } }) => {
            const [updatedConductorType] = await db
                .update(conductorTypes)
                .set({ ...input })
                .where(eq(conductorTypes.id, input.id))
                .returning();
            if (!updatedConductorType)
                throw Error("Can't update conductor type");

            return updatedConductorType;
        }),
    delete: publicProcedure
        .input(deleteConductorTypeSchema)
        .mutation(async ({ input, ctx: { db } }) => {
            const [deletedConductor] = await db
                .delete(conductorTypes)
                .where(eq(conductorTypes.id, input.id))
                .returning();
            if (!deletedConductor) throw Error("Can't update conductor type");

            return deletedConductor;
        }),
});
