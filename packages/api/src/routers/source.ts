import Source from "@repo/db/models/Source.model";
import {
    createSourceSchema,
    deleteSourceSchema,
    getAllSourcesSchema,
    getSourceByIdSchema,
    updateSourceSchema,
} from "@repo/validators/schemas/Source.schema";

import { publicProcedure, router } from "../trpc";

export default router({
    getAll: publicProcedure
        .input(getAllSourcesSchema)
        .query(({ ctx }) => ctx.dataSource.getRepository(Source).find()),
    getById: publicProcedure
        .input(getSourceByIdSchema)
        .query(async ({ input, ctx }) => {
            const sourceRepository = ctx.dataSource.getRepository(Source);
            return sourceRepository.findOneByOrFail({
                id: input.id,
            });
        }),
    create: publicProcedure
        .input(createSourceSchema)
        .mutation(async ({ input, ctx }) => {
            const sourceRepository = ctx.dataSource.getRepository(Source);
            const source = await sourceRepository.create(input);
            return source.save();
        }),
    update: publicProcedure
        .input(updateSourceSchema)
        .mutation(async ({ input, ctx }) =>
            ctx.dataSource.getRepository(Source).update({ id: input.id }, input)
        ),
    delete: publicProcedure
        .input(deleteSourceSchema)
        .mutation(async ({ input, ctx }) => {
            ctx.dataSource.getRepository(Source).delete({ id: input.id });
        }),
});
