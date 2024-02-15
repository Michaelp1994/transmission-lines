import * as z from "zod";

import {
    createConductorLocationSchema,
    defaultConductorLocation,
    updateConductorLocationSchema,
} from "./ConductorLocation.schema";
import { geometryId } from "./Ids.schema";
import hasNoOverlappingConductors from "../helpers/hasNoOverlappingConductors";

// create

export const createTowerGeometrySchema = z.object({
    name: z.string().min(2).max(50).trim(),
    conductors: createConductorLocationSchema
        .array()
        .refine((conductors) => hasNoOverlappingConductors(conductors), {
            message: "Two conductors cannot be at the same location",
        }),
});

export type CreateTowerGeometryInput = z.infer<
    typeof createTowerGeometrySchema
>;

// update

export const updateTowerGeometrySchema = createTowerGeometrySchema.extend({
    id: geometryId,
    conductors: createConductorLocationSchema
        .or(updateConductorLocationSchema)
        .array(),
});

export type UpdateTowerGeometryInput = z.infer<
    typeof updateTowerGeometrySchema
>;

// getAllTowerGeometries

export const getAllTowerGeometriesSchema = z.object({}).optional();

export type GetAllTowerGeometriesInput = z.infer<
    typeof getAllTowerGeometriesSchema
>;

// getById

export const getTowerGeometryByIdSchema = z.object({ id: geometryId });

export type GetTowerGeometryByIdInput = z.infer<
    typeof getTowerGeometryByIdSchema
>;

// delete

export const deleteTowerGeometrySchema = z.object({ id: geometryId });

export type DeleteTowerGeometryInput = z.infer<
    typeof deleteTowerGeometrySchema
>;

export const defaultTowerGeometry: CreateTowerGeometryInput = {
    name: "",
    conductors: [{ ...defaultConductorLocation }],
};
