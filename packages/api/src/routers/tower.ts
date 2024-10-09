import { eq } from "@repo/db/drizzle";
import {
    conductorLocations,
    conductorLocations,
} from "@repo/db/schemas/conductorLocations";
import { conductorTypes } from "@repo/db/schemas/conductorTypes";
import { towerGeometries } from "@repo/db/schemas/towerGeometries";
import {
    createTransmissionTowerSchema,
    deleteTransmissionTowerSchema,
    generateTowersSchema,
    getTowerParametersSchema,
    getTowersByLineIdSchema,
} from "@repo/validators/schemas/TransmissionTower.schema";
import { TRPCError } from "@trpc/server";
import { randomUUID } from "crypto";

import generateTowers from "../helpers/generateTowers";
import buildTransmissionLineMatrix from "../helpers/transmissionLineParameters";
import { publicProcedure, router } from "../trpc";

export default router({
    getAll: publicProcedure
        .input(getTowersByLineIdSchema)
        .query(async ({ ctx, input }) => {
            if (!ctx.store.project) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "No Current Project",
                });
            }
            const line = ctx.store.project?.transmissionLines.find(
                (tline) => tline.id === input.lineId
            );
            if (!line) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Can't find Transmission Line",
                });
            }
            const towers = [];
            for await (const tower of line.towers) {
                const type = await ctx.db
                    .select()
                    .from(towerGeometries)
                    .where(eq(towerGeometries.id, tower.geometryId))
                    .execute();
                towers.push({
                    ...tower,
                    geometry: type[0],
                });
            }
            return towers;
        }),
    getParameters: publicProcedure
        .input(getTowerParametersSchema)
        .query(async ({ ctx, input }) => {
            if (!ctx.store.project) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "No Current Project",
                });
            }

            const tower = ctx.store.project.transmissionLines
                .flatMap((tline) => tline.towers)
                .find((tower) => tower.id === input.towerId);

            if (!tower) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Can't find Transmission Tower",
                });
            }

            const locations = await ctx.db
                .select()
                .from(conductorLocations)
                .where(eq(conductorLocations.geometryId, tower.geometryId))
                .execute();

            const line = ctx.store.project.transmissionLines.find(
                (tline) => tline.id === tower.lineId
            );

            if (!line) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Can't find Transmission Line",
                });
            }

            const types = [];

            for await (const conductor of line.conductors) {
                const [type] = await ctx.db
                    .select()
                    .from(conductorTypes)
                    .where(eq(conductorTypes.id, conductor.typeId))
                    .execute();
                if (!type) {
                    throw new TRPCError({
                        code: "NOT_FOUND",
                        message: "Can't find Transmission Type",
                    });
                }
                types.push(type);
            }
            const matrixes = buildTransmissionLineMatrix(locations, types);
            return matrixes;
        }),
    create: publicProcedure
        .input(createTransmissionTowerSchema)
        .mutation(async ({ input, ctx }) => {
            const newTower = {
                id: randomUUID(),
                ...input,
            };
            const line = ctx.store.project?.transmissionLines.find(
                (tline) => tline.id === input.lineId
            );

            if (!line) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Can't find Transmission Line",
                });
            }
            line.towers.push(newTower);
            return newTower;
        }),

    generate: publicProcedure
        .input(generateTowersSchema)
        .mutation(async ({ input, ctx }) => {
            const line = ctx.store.project?.transmissionLines.find(
                (tline) => tline.id === input.lineId
            );
            if (!line) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Can't find Transmission Line",
                });
            }
            const towers = generateTowers(input);
            line.towers.push(...towers);
            return towers;
        }),
    delete: publicProcedure
        .input(deleteTransmissionTowerSchema)
        .mutation(async ({ input, ctx }) => {
            if (!ctx.store.project) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "No Current Project",
                });
            }
            const tower = ctx.store.project.transmissionLines
                .flatMap((tline) => tline.towers)
                .find((tower) => tower.id === input.id);
            if (!tower) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Can't find Transmission Tower",
                });
            }
            const tline = ctx.store.project.transmissionLines.find(
                (tl) => tl.id === tower.lineId
            );
            if (!tline) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Can't find Transmission Line",
                });
            }
            const index = tline.towers.findIndex((t) => t.id === tower.id);
            tline.towers.splice(index, 1);
            return tower;
        }),
});
