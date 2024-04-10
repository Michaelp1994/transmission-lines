import { eq } from "@repo/db/drizzle";
import { transmissionTowers } from "@repo/db/schemas/transmissionTowers";
import {
    createTransmissionTowerSchema,
    deleteTransmissionTowerSchema,
    generateTowersSchema,
    getTowerByIdSchema,
    getTowerParametersSchema,
    getTowersByLineIdSchema,
    updateTransmissionTowerSchema,
} from "@repo/validators";

import generateTowers from "@/helpers/generateTowers";
import buildTransmissionLineMatrix from "@/helpers/transmissionLineParameters";
import { publicProcedure, publicProcedure, router } from "@/trpc";

export default router({
    create: publicProcedure
        .input(createTransmissionTowerSchema)
        .mutation(async ({ input, ctx: { db } }) => {
            const [newTower] = await db
                .insert(transmissionTowers)
                .values(input)
                .returning();
            if (!newTower) throw Error("Can't create tower");
            return newTower;
        }),
    generate: publicProcedure
        .input(generateTowersSchema)
        .mutation(async ({ input, ctx: { db } }) => {
            const towers = generateTowers(input);
            const newTowers = await db
                .insert(transmissionTowers)
                .values(towers)
                .returning();
            if (!newTowers) throw Error("Can't generate towers");
            return newTowers;
        }),
    getParameters: publicProcedure
        .input(getTowerParametersSchema)
        .query(async ({ input, ctx: { db } }) => {
            const tower = await db.query.transmissionTowers.findFirst({
                where: eq(transmissionTowers.id, input.id),
                with: {
                    transmissionLine: {
                        with: {
                            conductors: {
                                with: {
                                    type: true,
                                },
                            },
                        },
                    },
                    geometry: {
                        with: {
                            conductors: true,
                        },
                    },
                },
            });
            console.log(tower);
            if (!tower) throw Error("Can't update transmission line");
            try {
                const matrixes = buildTransmissionLineMatrix(
                    tower.geometry,
                    tower.transmissionLine.conductors
                );
            } catch (e) {
                console.log(e);
                throw Error("Can't calculate matrixes");
            }

            console.log("matrices: ", matrixes);
            return matrixes;
        }),

    update: publicProcedure
        .input(updateTransmissionTowerSchema)
        .mutation(async ({ input, ctx: { db } }) => {
            const [updatedTower] = await db
                .update(transmissionTowers)
                .set(input)
                .where(eq(transmissionTowers.id, input.id))
                .returning();
            if (!updatedTower) throw Error("Can't update tower");
            return updatedTower;
        }),
    getById: publicProcedure
        .input(getTowerByIdSchema)
        .query(async ({ input, ctx: { db } }) => {
            const tower = await db.query.transmissionTowers.findFirst({
                where: eq(transmissionTowers.id, input.id),
            });
            if (!tower) throw Error("Can't find tower");
            return tower;
        }),
    getAllByLineId: publicProcedure
        .input(getTowersByLineIdSchema)
        .query(async ({ input, ctx: { db } }) => {
            const towers = await db.query.transmissionTowers.findMany({
                where: eq(transmissionTowers.lineId, input.lineId),
                with: {
                    geometry: true,
                },
            });
            if (!towers) throw Error("Can't find transmission towers");
            return towers;
        }),

    delete: publicProcedure
        .input(deleteTransmissionTowerSchema)
        .mutation(async ({ input, ctx: { db } }) => {
            const [deletedTower] = await db
                .delete(transmissionTowers)
                .where(eq(transmissionTowers.id, input.id))
                .returning();
            if (!deletedTower) throw Error("Can't delete tower");
            return deletedTower;
        }),
});
