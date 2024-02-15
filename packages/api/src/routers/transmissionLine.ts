import TransmissionLine from "@repo/db/models/TransmissionLine.model";
import {
    createTransmissionLineSchema,
    deleteTransmissionLineSchema,
    getAllTransmissionLinesSchema,
    getTransmissionLineByIdSchema,
    getTransmissionLineParametersSchema,
    updateTransmissionLineSchema,
} from "@repo/validators/schemas/TransmissionLine.schema";

import buildTransmissionLineMatrix from "@/helpers/transmissionLineParameters";

import { publicProcedure, router } from "../trpc";

export default router({
    getAll: publicProcedure
        .input(getAllTransmissionLinesSchema)
        .query(async ({ ctx, input }) =>
            ctx.dataSource
                .getRepository(TransmissionLine)
                .find({ where: { projectId: input.projectId } })
        ),
    getById: publicProcedure
        .input(getTransmissionLineByIdSchema)
        .query(async ({ input, ctx }) =>
            ctx.dataSource.getRepository(TransmissionLine).findOneOrFail({
                where: {
                    id: input.id,
                },
                relations: ["towers", "conductors"],
            })
        ),
    create: publicProcedure
        .input(createTransmissionLineSchema)
        .mutation(async ({ input, ctx }) => {
            const transmissionLineRepository =
                ctx.dataSource.getRepository(TransmissionLine);
            const transmissionLine = transmissionLineRepository.create(input);
            transmissionLine.save();
        }),
    update: publicProcedure
        .input(updateTransmissionLineSchema)
        .mutation(async ({ input, ctx }) => {
            const transmissionLineRepository =
                ctx.dataSource.getRepository(TransmissionLine);
            return transmissionLineRepository.save({ ...input });
        }),
    getParameters: publicProcedure
        .input(getTransmissionLineParametersSchema)
        .query(async ({ input, ctx }) => {
            const transmissionLine = await ctx.dataSource
                .getRepository(TransmissionLine)
                .findOneOrFail({
                    where: {
                        id: input.id,
                    },
                    relations: {
                        towers: {
                            geometry: {
                                conductors: true,
                            },
                        },
                        conductors: {
                            type: true,
                        },
                    },
                });

            const matrixes = buildTransmissionLineMatrix(transmissionLine);
            return matrixes;
        }),
    delete: publicProcedure
        .input(deleteTransmissionLineSchema)
        .mutation(async ({ input, ctx }) => {
            const transmissionLineRepository =
                ctx.dataSource.getRepository(TransmissionLine);
            await transmissionLineRepository.delete({ id: input.id });
        }),
});
