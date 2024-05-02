import { eq } from "@repo/db/drizzle";
import { conductorLocations } from "@repo/db/schemas/conductorLocations";
import {
    createConductorLocationSchema,
    deleteConductorLocationSchema,
    getAllConductorLocationsByGeometryIdSchema,
    getAllConductorLocationsSchema,
    getConductorLocationByIdSchema,
    updateConductorLocationSchema,
} from "@repo/validators/schemas/ConductorLocation.schema";
import { publicProcedure, router } from "../trpc";

export default router({
    getAll: publicProcedure
        .input(getAllConductorLocationsSchema)
        .query(async ({ ctx: { db } }) => {
            const allConductors = await db.query.conductorLocations.findMany();

            return allConductors;
        }),
    getAllByGeometryId: publicProcedure
        .input(getAllConductorLocationsByGeometryIdSchema)
        .query(async ({ input, ctx: { db } }) => {
            const towers = await db.query.conductorLocations.findMany({
                where: eq(conductorLocations.geometryId, input.geometryId),
            });

            if (!towers) {throw new Error("Can't find transmission conductors");}

            return towers;
        }),
    getById: publicProcedure
        .input(getConductorLocationByIdSchema)
        .query(async ({ input, ctx: { db } }) => {
            const conductorType = await db.query.conductorLocations.findFirst({
                where: eq(conductorLocations.id, input.locationId),
            });

            if (!conductorType) {throw new Error("Can't find conductor");}

            return conductorType;
        }),

    create: publicProcedure
        .input(createConductorLocationSchema)
        .mutation(async ({ input, ctx: { db } }) => {
            const [newConductor] = await db
                .insert(conductorLocations)
                .values(input)
                .returning();

            if (!newConductor) {throw new Error("Can't create conductor");}

            return newConductor;
        }),
    // generate: publicProcedure
    //     .input(generateConductorLocationsSchema)
    //     .mutation(async ({ input, ctx: { db } }) => {
    //         // const conductors = generateConductors(input);
    //         // const createdConductors = await db
    //         //     .insert(conductorLocations)
    //         //     .values(conductors)
    //         //     .returning();
    //         // return createdConductors;
    //     }),
    update: publicProcedure
        .input(updateConductorLocationSchema)
        .mutation(async ({ input, ctx: { db } }) => {
            const [updatedConductor] = await db
                .update(conductorLocations)
                .set(input)
                .where(eq(conductorLocations.id, input.id))
                .returning();

            if (!updatedConductor) {throw new Error("Can't update conductor");}

            return updatedConductor;
        }),
    delete: publicProcedure
        .input(deleteConductorLocationSchema)
        .mutation(async ({ input, ctx: { db } }) => {
            const [deletedConductor] = await db
                .delete(conductorLocations)
                .where(eq(conductorLocations.id, input.locationId))
                .returning();

            if (!deletedConductor) {throw new Error("Can't delete conductor");}

            return deletedConductor;
        }),
});
