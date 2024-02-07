import { z } from "zod";
import {
    sourceInputSchema,
    updateSourceSchema,
} from "@repo/validators/schemas/Source.schema";
import Source from "@repo/db/models/Source.model";
import { router, publicProcedure } from "../trpc";

export default router({
    getAll: publicProcedure.query(({ ctx }) =>
        ctx.memoryDb.getRepository(Source).find()
    ),
    getById: publicProcedure
        .input(z.string().uuid())
        .query(async ({ input, ctx }) => {
            const sourceRepository = ctx.memoryDb.getRepository(Source);
            return sourceRepository.findOneByOrFail({
                id: input,
            });
        }),
    create: publicProcedure
        .input(sourceInputSchema)
        .mutation(async ({ input, ctx }) => {
            const sourceRepository = ctx.memoryDb.getRepository(Source);

            const source = await sourceRepository.create(input);
            source.save();
        }),
    update: publicProcedure
        .input(updateSourceSchema)
        .mutation(async ({ input, ctx }) => {
            const sourceRepository = ctx.memoryDb.getRepository(Source);
            const source = await sourceRepository.findOne({
                where: { id: input.id },
            });
            if (!source) throw Error("Can't find Source!");
            Object.assign(source, input.source);
            source.save();
        }),
    delete: publicProcedure
        .input(z.string().uuid())
        .mutation(async ({ input, ctx }) => {
            const sourceRepository = ctx.memoryDb.getRepository(Source);
            const source = await sourceRepository.findOne({
                where: { id: input },
            });
            if (!source) throw Error("Can't find Source!");
            source.remove();
        }),
});
