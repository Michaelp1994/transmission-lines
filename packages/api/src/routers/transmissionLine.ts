import {
    createTransmissionLineSchema,
    deleteTransmissionLineSchema,
    getAllTransmissionLinesSchema,
    getTransmissionLineByIdSchema,
    updateTransmissionLineSchema,
} from "@repo/validators/schemas/TransmissionLine.schema";
import TransmissionLine from "@repo/db/models/TransmissionLine.model";
import { router, publicProcedure } from "../trpc";

export default router({
    getAll: publicProcedure
        .input(getAllTransmissionLinesSchema)
        .query(async ({ ctx }) =>
            ctx.memoryDb.getRepository(TransmissionLine).find()
        ),
    getById: publicProcedure
        .input(getTransmissionLineByIdSchema)
        .query(async ({ input, ctx }) =>
            ctx.memoryDb.getRepository(TransmissionLine).findOneOrFail({
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
                ctx.memoryDb.getRepository(TransmissionLine);
            const transmissionLine = transmissionLineRepository.create(input);
            transmissionLine.save();
        }),
    update: publicProcedure
        .input(updateTransmissionLineSchema)
        .mutation(async ({ input, ctx }) => {
            const transmissionLineRepository =
                ctx.memoryDb.getRepository(TransmissionLine);
            return transmissionLineRepository.save({ ...input });
        }),
    delete: publicProcedure
        .input(deleteTransmissionLineSchema)
        .mutation(async ({ input, ctx }) => {
            const transmissionLineRepository =
                ctx.memoryDb.getRepository(TransmissionLine);
            await transmissionLineRepository.delete({ id: input.id });
        }),
});
