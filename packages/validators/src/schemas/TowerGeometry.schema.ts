import * as z from "zod";
import {
    conductorLocationSchema,
    defaultConductorLocation,
} from "./ConductorLocation.schema";
import hasNoOverlappingConductors from "../helpers/hasNoOverlappingConductors";

export const towerGeometryInputSchema = z.object({
    name: z.string().min(2).max(50).trim(),
    conductors: conductorLocationSchema
        .array()
        .refine((conductors) => hasNoOverlappingConductors(conductors), {
            message: "Two conductors cannot be at the same location",
        }),
});

export const updateTowerGeometrySchema = z.object({
    id: z.number().positive(),
    towerGeometry: towerGeometryInputSchema,
});

export const towerGeometrySchema = towerGeometryInputSchema.extend({
    id: z.number().positive(),
});

export type TowerGeometryInput = z.infer<typeof towerGeometryInputSchema>;
export type TowerGeometry = z.infer<typeof towerGeometrySchema>;
export const defaultTowerGeometry: TowerGeometryInput = {
    name: "",
    conductors: [{ ...defaultConductorLocation }],
};
