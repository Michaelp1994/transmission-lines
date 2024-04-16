import * as z from "zod";

import { geometryId, locationId } from "./Ids.schema";

// create

export const createConductorLocationSchema = z.object({
    x: z.coerce.number(),
    y: z.coerce.number(),
    geometryId,
});

export type CreateConductorLocationInput = z.infer<
    typeof createConductorLocationSchema
>;

export const defaultConductorLocation: CreateConductorLocationInput = {
    x: 0,
    y: 0,
    geometryId: "",
};

// update

export const updateConductorLocationSchema =
    createConductorLocationSchema.extend({
        id: z.number(),
    });

export type UpdateConductorLocationInput = z.infer<
    typeof updateConductorLocationSchema
>;

// getById

export const getConductorLocationByIdSchema = z.object({
    locationId,
});

export type GetConductorLocationByIdInput = z.infer<
    typeof getConductorLocationByIdSchema
>;

// getAll

export const getAllConductorLocationsSchema = z.object({});

export type GetAllConductorLocationsInput = z.infer<
    typeof getAllConductorLocationsSchema
>;

// getAllByGeometryId

export const getAllConductorLocationsByGeometryIdSchema = z.object({
    geometryId,
});

export type GetAllConductorLocationsByGeometryIdInput = z.infer<
    typeof getAllConductorLocationsByGeometryIdSchema
>;

// generate

export const generateConductorLocationsSchema = z.object({
    geometryId,
});

export type GenerateConductorLocationsInput = z.infer<
    typeof generateConductorLocationsSchema
>;

// delete

export const deleteConductorLocationSchema = z.object({
    locationId,
});

export type DeleteConductorLocationInput = z.infer<
    typeof deleteConductorLocationSchema
>;
