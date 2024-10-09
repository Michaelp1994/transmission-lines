import {
    createSourceSchema,
    deleteSourceSchema,
    getAllSourcesSchema,
    getPhaseComponentsSchema,
    getSourceByIdSchema,
    updateSourceElectricalSchema,
} from "@repo/validators/schemas/Source.schema";
import { TRPCError } from "@trpc/server";
import { randomUUID } from "crypto";

import calculateZPhaseComponents from "../helpers/calculateZPhaseComponents";
import calculateZSequenceComponents from "../helpers/calculateZSequenceComponents";
import { projectProcedure, router } from "../trpc";

export default router({
    getAll: projectProcedure
        .input(getAllSourcesSchema)
        .query(async ({ ctx }) => {
            return ctx.store.project.sources;
        }),
    getById: projectProcedure
        .input(getSourceByIdSchema)
        .query(async ({ input, ctx }) => {
            const source = ctx.store.project.sources.find(
                (s) => s.id === input.id
            );
            if (!source) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Source not found",
                });
            }
            return source;
        }),
    create: projectProcedure
        .input(createSourceSchema)
        .mutation(async ({ input, ctx }) => {
            const newSource = {
                id: randomUUID(),
                enabled: true,
                x: 0,
                y: 0,
                ...input,
            };
            ctx.store.project?.sources.push(newSource);
            return newSource;
        }),
    update: projectProcedure
        .input(updateSourceElectricalSchema)
        .mutation(async ({ input, ctx }) => {
            const source = ctx.store.project.sources.find(
                (s) => s.id === input.id
            );
            if (!source) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Source not found",
                });
            }
            Object.assign(source, input);
            return source;
        }),
    delete: projectProcedure
        .input(deleteSourceSchema)
        .mutation(async ({ input, ctx }) => {
            const index = ctx.store.project.sources.findIndex(
                (s) => s.id === input.id
            );
            if (index === -1) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Source not found",
                });
            }
            const [deletedSource] = ctx.store.project.sources.splice(index, 1);

            return deletedSource;
        }),
    getPhaseComponents: projectProcedure
        .input(getPhaseComponentsSchema)
        .query(async ({ input, ctx }) => {
            const source = ctx.store.project.sources.find(
                (s) => s.id === input.id
            );
            if (!source) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Source not found",
                });
            }
            const sequenceComponents = calculateZSequenceComponents(source);

            const phaseMatrix = calculateZPhaseComponents(sequenceComponents);
            return { ...sequenceComponents, phaseMatrix };
        }),
});
