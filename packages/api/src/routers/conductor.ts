import { eq } from "@repo/db/drizzle";
import { conductorTypes } from "@repo/db/schemas/conductorTypes";
import {
    createConductorSchema,
    deleteConductorSchema,
    generateConductorsSchema,
    getAllConductorsByLineIdSchema,
    getConductorByIdSchema,
    updateConductorSchema,
} from "@repo/validators/schemas/Conductor.schema";
import { TRPCError } from "@trpc/server";
import { randomUUID } from "crypto";

import generateConductors from "../helpers/generateConductors";
import { projectProcedure, router } from "../trpc";

export default router({
    getAll: projectProcedure
        .input(getAllConductorsByLineIdSchema)
        .query(async ({ ctx, input }) => {
            const tline = ctx.store.project.transmissionLines.find(
                (tline) => tline.id === input.lineId
            );
            if (!tline) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Can't find Transmission Line",
                });
            }
            const conductors = [];
            for await (const conductor of tline.conductors) {
                const type = await ctx.db
                    .select()
                    .from(conductorTypes)
                    .where(eq(conductorTypes.id, conductor.typeId))
                    .execute();
                conductors.push({
                    ...conductor,
                    type: type[0],
                });
            }
            return conductors;
        }),
    getById: projectProcedure
        .input(getConductorByIdSchema)
        .query(async ({ input, ctx }) => {
            const conductor = ctx.store.project.transmissionLines
                .flatMap((tline) => tline.conductors)
                .find((c) => c.id === input.id);
            if (!conductor) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Can't find Conductor",
                });
            }
            return conductor;
        }),
    create: projectProcedure
        .input(createConductorSchema)
        .mutation(async ({ input, ctx }) => {
            const tline = ctx.store.project.transmissionLines.find(
                (tline) => tline.id === input.lineId
            );
            if (!tline) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Can't find Transmission Line",
                });
            }
            const newConductor = {
                id: randomUUID(),
                ...input,
            };
            tline.conductors.push(newConductor);
            return newConductor;
        }),
    generate: projectProcedure
        .input(generateConductorsSchema)
        .mutation(async ({ input, ctx }) => {
            const tline = ctx.store.project.transmissionLines.find(
                (tline) => tline.id === input.lineId
            );
            if (!tline) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Can't find Transmission Line",
                });
            }
            const conductors = generateConductors(input);
            tline.conductors.push(...conductors);
            return conductors;
        }),
    update: projectProcedure
        .input(updateConductorSchema)
        .mutation(async ({ input, ctx }) => {
            const conductor = ctx.store.project.transmissionLines
                .flatMap((tline) => tline.conductors)
                .find((c) => c.id === input.id);
            if (!conductor) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Can't find Conductor",
                });
            }

            Object.assign(conductor, input);
            return conductor;
        }),
    delete: projectProcedure
        .input(deleteConductorSchema)
        .mutation(async ({ input, ctx }) => {
            const conductor = ctx.store.project.transmissionLines
                .flatMap((tline) => tline.conductors)
                .find((c) => c.id === input.id);
            if (!conductor) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Can't find Conductor",
                });
            }
            const tline = ctx.store.project.transmissionLines.find(
                (tl) => tl.id === conductor.lineId
            );
            if (!tline) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Can't find Transmission Line",
                });
            }
            const index = tline.conductors.findIndex(
                (c) => c.id === conductor.id
            );
            tline.conductors.splice(index, 1);
            return conductor;
        }),
});
