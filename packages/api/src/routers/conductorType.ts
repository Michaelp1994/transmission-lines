import ConductorType from "@repo/db/models/ConductorType.model";
import {
    createConductorTypeSchema,
    deleteConductorTypeSchema,
    getAllConductorsSchema,
    getConductorTypeByIdSchema,
    updateConductorTypeSchema,
} from "@repo/validators/schemas/ConductorType.schema";

import { publicProcedure, router } from "../trpc";

export default router({
    getAll: publicProcedure
        .input(getAllConductorsSchema)
        .query(async ({ ctx, input }) => {
            const repository = ctx.mainDb.getRepository(ConductorType);
            const findOptions = input && {
                skip: input.pageIndex,
                take: input.pageSize,
            };
            const allConductorTypes = await repository.find(findOptions);
            return allConductorTypes;
        }),
    getById: publicProcedure
        .input(getConductorTypeByIdSchema)
        .query(({ input, ctx }) => {
            const repository = ctx.mainDb.getRepository(ConductorType);
            return repository.findOneByOrFail({
                id: input.id,
            });
        }),
    create: publicProcedure
        .input(createConductorTypeSchema)
        .mutation(({ input, ctx }) => {
            const newConductorType = ctx.mainDb
                .getRepository(ConductorType)
                .create(input);
            return newConductorType.save();
        }),
    update: publicProcedure
        .input(updateConductorTypeSchema)
        .mutation(async ({ input, ctx }) => {
            const repository = ctx.mainDb.getRepository(ConductorType);
            return repository.save({ ...input });
        }),
    delete: publicProcedure
        .input(deleteConductorTypeSchema)
        .mutation(async ({ input, ctx }) => {
            ctx.mainDb.getRepository(ConductorType).delete({ id: input.id });
        }),
});
