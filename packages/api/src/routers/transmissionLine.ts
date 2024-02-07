import { z } from "zod";
import {
    transmissionLineInputSchema,
    transmissionLineSchema,
} from "@repo/validators/schemas/TransmissionLine.schema";
import TransmissionLine from "@repo/db/models/TransmissionLine.model";
import { router, publicProcedure } from "../trpc";

export default router({
    getAll: publicProcedure.query(async ({ ctx }) =>
        ctx.memoryDb.getRepository(TransmissionLine).find()
    ),
    getById: publicProcedure
        .input(z.string().uuid())
        .query(async ({ input, ctx }) => {
            const sourceRepository =
                ctx.memoryDb.getRepository(TransmissionLine);
            const transmissionLine = sourceRepository.findOne({
                where: { id: input },
            });
            if (!transmissionLine) throw Error("Can't find Transmission Line!");
            return transmissionLine;
        }),
    create: publicProcedure
        .input(transmissionLineInputSchema)
        .mutation(async ({ input, ctx }) => {
            const sourceRepository =
                ctx.memoryDb.getRepository(TransmissionLine);
            const transmissionLine = sourceRepository.create(input);
            transmissionLine.save();
        }),
    update: publicProcedure
        .input(transmissionLineSchema)
        .mutation(async ({ input, ctx }) => {
            const sourceRepository =
                ctx.memoryDb.getRepository(TransmissionLine);
            const transmissionLine = sourceRepository.findOne({
                where: { id: input.id },
            });
            if (!transmissionLine)
                throw Error("Can't find the Transmission Line!");
            await sourceRepository.update(input.id, input);
        }),
    delete: publicProcedure
        .input(z.string().uuid())
        .mutation(async ({ input, ctx }) => {
            const sourceRepository =
                ctx.memoryDb.getRepository(TransmissionLine);
            sourceRepository.delete({ id: input });
        }),
});
