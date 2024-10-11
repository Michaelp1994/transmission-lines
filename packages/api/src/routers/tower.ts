import { eq, inArray } from "@repo/db/drizzle";
import { transmissionConductors } from "@repo/db/project/transmissionConductors";
import { transmissionTowers } from "@repo/db/project/transmissionTowers";
import { conductorLocations } from "@repo/db/schemas/conductorLocations";
import { conductorTypes } from "@repo/db/schemas/conductorTypes";
import { towerGeometries } from "@repo/db/schemas/towerGeometries";
import {
    createTransmissionTowerSchema,
    deleteManyTransmissionTowersSchema,
    deleteTransmissionTowerSchema,
    generateTowersSchema,
    getTowerByIdSchema,
    getTowerParametersSchema,
    getTowersByLineIdSchema,
} from "@repo/validators/schemas/TransmissionTower.schema";
import { TRPCError } from "@trpc/server";

import generateTowers from "../helpers/generateTowers";
import buildTransmissionLineMatrix from "../helpers/transmissionLineParameters";
import { projectProcedure, router } from "../trpc";

export default router({
    getAll: projectProcedure
        .input(getTowersByLineIdSchema)
        .query(async ({ ctx, input }) => {
            const towers = await ctx.project.db
                .select()
                .from(transmissionTowers)
                .where(eq(transmissionTowers.lineId, input.lineId));
            const result = [];
            for await (const tower of towers) {
                const [geometry] = await ctx.db
                    .select()
                    .from(towerGeometries)
                    .where(eq(towerGeometries.id, tower.geometryId));
                if (!geometry) {
                    throw new TRPCError({
                        code: "NOT_FOUND",
                        message: "Can't find Tower Geometry",
                    });
                }
                result.push({
                    ...tower,
                    geometry,
                });
            }
            return result;
        }),
    getById: projectProcedure
        .input(getTowerByIdSchema)
        .query(async ({ ctx, input }) => {
            const [tower] = await ctx.project.db
                .select()
                .from(transmissionTowers)
                .where(eq(transmissionTowers.id, input.id));
            if (!tower) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Can't find Transmission Tower",
                });
            }
            const [geometry] = await ctx.db
                .select()
                .from(towerGeometries)
                .where(eq(towerGeometries.id, tower.geometryId));
            return { ...tower, geometry };
        }),
    getParameters: projectProcedure
        .input(getTowerParametersSchema)
        .query(async ({ ctx, input }) => {
            const [tower] = await ctx.project.db
                .select()
                .from(transmissionTowers)
                .where(eq(transmissionTowers.id, input.towerId));

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

            const conductors = await ctx.project.db
                .select()
                .from(transmissionConductors)
                .where(eq(transmissionConductors.lineId, tower.lineId));

            const types = [];
            for await (const conductor of conductors) {
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
            if (locations.length !== types.length) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Locations and Types must have the same length",
                });
            }
            const matrixes = buildTransmissionLineMatrix(locations, types);
            return matrixes;
        }),
    create: projectProcedure
        .input(createTransmissionTowerSchema)
        .mutation(async ({ input, ctx }) => {
            const [newTower] = await ctx.project.db
                .insert(transmissionTowers)
                .values(input)
                .returning();

            if (!newTower) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Can't find Transmission Tower",
                });
            }

            return newTower;
        }),

    generate: projectProcedure
        .input(generateTowersSchema)
        .mutation(async ({ input, ctx }) => {
            const towers = generateTowers(input);
            const newTowers = await ctx.project.db
                .insert(transmissionTowers)
                .values(towers)
                .returning();

            return newTowers;
        }),
    delete: projectProcedure
        .input(deleteTransmissionTowerSchema)
        .mutation(async ({ input, ctx }) => {
            const [deletedTower] = await ctx.project.db
                .delete(transmissionTowers)
                .where(eq(transmissionTowers.id, input.id))
                .returning();

            return deletedTower;
        }),
    deleteMany: projectProcedure
        .input(deleteManyTransmissionTowersSchema)
        .mutation(async ({ input, ctx }) => {
            const [deletedTower] = await ctx.project.db
                .delete(transmissionTowers)
                .where(inArray(transmissionTowers.id, input))
                .returning();

            return deletedTower;
        }),
});
