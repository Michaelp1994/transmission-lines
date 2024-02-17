import { eq } from "@repo/db/drizzle";
import { transmissionLines } from "@repo/db/schemas/transmissionLines";
import {
    createTransmissionLineSchema,
    deleteTransmissionLineSchema,
    getAllTransmissionLinesSchema,
    getTransmissionLineByIdSchema,
    getTransmissionLineParametersSchema,
    updateTransmissionLineSchema,
} from "@repo/validators/schemas/TransmissionLine.schema";

import { publicProcedure, router } from "../trpc";

import buildTransmissionLineMatrix from "@/helpers/transmissionLineParameters";

export default router({
    getAll: publicProcedure
        .input(getAllTransmissionLinesSchema)
        .query(async ({ ctx: { db }, input }) => {
            const allTransmissionLines =
                await db.query.transmissionLines.findMany({
                    where: eq(transmissionLines.id, input.projectId),
                });
            return allTransmissionLines;
        }),
    getById: publicProcedure
        .input(getTransmissionLineByIdSchema)
        .query(async ({ input, ctx: { db } }) => {
            const transmissionLine = await db.query.transmissionLines.findFirst(
                {
                    where: eq(transmissionLines.id, input.id),
                    with: {
                        towers: true,
                        conductors: true,
                    },
                }
            );
            if (!transmissionLine) throw Error("Can't find transmission line");
            return transmissionLine;
        }),
    create: publicProcedure
        .input(createTransmissionLineSchema)
        .mutation(async ({ input, ctx: { db } }) => {
            const [newTranmissionLine] = await db
                .insert(transmissionLines)
                .values(input)
                .returning();
            if (!newTranmissionLine)
                throw Error("Can't create transmission line");
            return newTranmissionLine;
        }),
    update: publicProcedure
        .input(updateTransmissionLineSchema)
        .mutation(async ({ input, ctx: { db } }) => {
            const [updatedTranmissionLine] = await db
                .update(transmissionLines)
                .set(input)
                .returning();
            if (!updatedTranmissionLine)
                throw Error("Can't update transmission line");

            return updatedTranmissionLine;
        }),
    getParameters: publicProcedure
        .input(getTransmissionLineParametersSchema)
        .query(async ({ input, ctx: { db } }) => {
            const transmissionLine = await db.query.transmissionLines.findFirst(
                {
                    where: eq(transmissionLines.id, input.id),
                    with: {
                        towers: {
                            with: {
                                geometry: {
                                    with: {
                                        conductors: true,
                                    },
                                },
                            },
                        },
                        conductors: true,
                    },
                }
            );
            const matrixes = buildTransmissionLineMatrix(transmissionLine);
            return matrixes;
        }),
    delete: publicProcedure
        .input(deleteTransmissionLineSchema)
        .mutation(async ({ input, ctx: { db } }) => {
            const [deletedTranmissionLine] = await db
                .delete(transmissionLines)
                .where(eq(transmissionLines.id, input.id))
                .returning();
            if (!deletedTranmissionLine)
                throw Error("Can't delete transmission line");
            return deletedTranmissionLine;
        }),
});
