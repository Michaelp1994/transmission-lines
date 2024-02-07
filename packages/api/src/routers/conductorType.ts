import { z } from "zod";
import {
    conductorTypeInputSchema,
    updateConductorTypeSchema,
} from "@repo/validators/schemas/ConductorType.schema";
import ConductorType from "@repo/db/models/ConductorType.model";
import { router, publicProcedure } from "../trpc";

export default router({
    getAll: publicProcedure.query(async ({ ctx }) => {
        console.log("HERE");
        const repository = ctx.mainDb.getRepository(ConductorType);
        console.log(repository);
        const allConductorTypes = await repository.find();
        console.log(allConductorTypes);
        return allConductorTypes;
    }),
    getById: publicProcedure.input(z.number()).query(({ input, ctx }) => {
        const repository = ctx.mainDb.getRepository(ConductorType);
        return repository.findOneByOrFail({
            id: input,
        });
    }),
    create: publicProcedure
        .input(conductorTypeInputSchema)
        .mutation(({ input, ctx }) => {
            const newConductorType = ctx.mainDb
                .getRepository(ConductorType)
                .create(input);
            return newConductorType.save();
        }),
    update: publicProcedure
        .input(updateConductorTypeSchema)
        .mutation(async ({ input, ctx }) =>
            ctx.mainDb
                .getRepository(ConductorType)
                .update({ id: input.id }, input.conductorType)
        ),
});
