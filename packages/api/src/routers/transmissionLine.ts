import {
    createTransmissionLineSchema,
    deleteTransmissionLineSchema,
    getAllTransmissionLinesSchema,
    getTransmissionLineByIdSchema,
    updateTransmissionLineSchema,
} from "@repo/validators/schemas/TransmissionLine.schema";
import { TRPCError } from "@trpc/server";
import { randomUUID } from "crypto";

import { projectProcedure, router } from "../trpc";

export default router({
    getAll: projectProcedure
        .input(getAllTransmissionLinesSchema)
        .query(async ({ ctx }) => {
            const lines = ctx.store.project.transmissionLines.map((tline) => {
                const fromSource = ctx.store.project.sources.find(
                    (source) => source.id === tline.fromSourceId
                );
                const toSource = ctx.store.project.sources.find(
                    (source) => source.id === tline.toSourceId
                );
                return {
                    ...tline,
                    fromSource,
                    toSource,
                };
            });
            return lines;
        }),
    getById: projectProcedure
        .input(getTransmissionLineByIdSchema)
        .query(async ({ input, ctx }) => {
            const tline = ctx.store.project.transmissionLines.find(
                (tline) => tline.id === input.id
            );

            if (!tline) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Can't find Transmission Line",
                });
            }
            return tline;
        }),
    create: projectProcedure
        .input(createTransmissionLineSchema)
        .mutation(async ({ input, ctx }) => {
            const newTransmissionLine = {
                id: randomUUID(),
                towers: [],
                conductors: [],
                ...input,
            };
            ctx.store.project?.transmissionLines.push(newTransmissionLine);
            return newTransmissionLine;
        }),
    update: projectProcedure
        .input(updateTransmissionLineSchema)
        .mutation(async ({ input, ctx }) => {
            const transmissionLine = ctx.store.project?.transmissionLines.find(
                (tl) => tl.id === input.id
            );

            if (!transmissionLine) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "No Transmission Line",
                });
            }
            return transmissionLine;
        }),
    delete: projectProcedure
        .input(deleteTransmissionLineSchema)
        .mutation(async ({ input, ctx }) => {
            const index = ctx.store.project.transmissionLines.findIndex(
                (tl) => tl.id === input.id
            );

            if (index === -1) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "No Transmission Line",
                });
            }

            const [deleted] = ctx.store.project.transmissionLines.splice(
                index,
                1
            );

            if (!deleted) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "No Transmission Line",
                });
            }
            return deleted;
        }),
});
