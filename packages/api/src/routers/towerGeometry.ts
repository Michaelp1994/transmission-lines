import { eq } from "@repo/db/drizzle";
import {
    ConductorLocation,
    NewConductorLocation,
    conductorLocations,
} from "@repo/db/schemas/conductorLocations";
import { towerGeometries } from "@repo/db/schemas/towerGeometries";
import {
    createTowerGeometrySchema,
    deleteTowerGeometrySchema,
    getAllTowerGeometriesSchema,
    getTowerGeometryByIdSchema,
    updateTowerGeometrySchema,
} from "@repo/validators";

import { publicProcedure, router } from "../trpc";

export default router({
    getAll: publicProcedure
        .input(getAllTowerGeometriesSchema)
        .query(async ({ ctx: { db } }) => {
            const allTowerGeometries =
                await db.query.towerGeometries.findMany();
            return allTowerGeometries;
        }),
    getById: publicProcedure
        .input(getTowerGeometryByIdSchema)
        .query(async ({ input, ctx: { db } }) => {
            const towerGeometry = await db.query.towerGeometries.findFirst({
                where: eq(towerGeometries.id, input.id),
                with: {
                    conductors: true,
                },
            });
            if (!towerGeometry) throw Error("Can't find tower geometry");
            return towerGeometry;
        }),
    create: publicProcedure
        .input(createTowerGeometrySchema)
        .mutation(async ({ input, ctx: { db } }) => {
            const newTowerGeometry = await db.transaction(async (tx) => {
                const [towerGeometry] = await tx
                    .insert(towerGeometries)
                    .values(input)
                    .returning();
                if (!towerGeometry) {
                    await tx.rollback();
                    throw Error("Failed to create a new Tower Geometry");
                }
                const newConductors: NewConductorLocation[] =
                    input.conductors.map((conductor) => ({
                        ...conductor,
                        towerGeometryId: towerGeometry.id,
                    }));
                const newConductorLocations = await tx
                    .insert(conductorLocations)
                    .values(newConductors)
                    .returning();
                return {
                    ...towerGeometry,
                    conductors: newConductorLocations,
                };
            });

            return newTowerGeometry;
        }),
    update: publicProcedure
        .input(updateTowerGeometrySchema)
        .mutation(async ({ input, ctx: { db } }) => {
            const [updatedTowerGeometry] = await db
                .update(towerGeometries)
                .set(input)
                .where(eq(towerGeometries.id, input.id))
                .returning();
            if (!updatedTowerGeometry)
                throw Error("Can't update tower geometry");

            return updatedTowerGeometry;
        }),
    delete: publicProcedure
        .input(deleteTowerGeometrySchema)
        .mutation(async ({ input, ctx: { db } }) => {
            const [deletedTowerGeometry] = await db
                .delete(towerGeometries)
                .where(eq(towerGeometries.id, input.id))
                .returning();
            if (!deletedTowerGeometry)
                throw Error("Can't delete tower geometry");

            return deletedTowerGeometry;
        }),
});
