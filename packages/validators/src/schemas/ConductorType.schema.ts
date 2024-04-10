import * as z from "zod";

import { conductorTypeId } from "./Ids.schema";
// create

export const createConductorTypeSchema = z.object({
    name: z.string().min(2),
    surfaceArea: z.number().positive().optional(),
    stranding: z.string().optional(),
    outerDiameter: z.number().positive(),
    coreDiameter: z.number().positive().optional(),
    layers: z.number().optional(),
    currentCapacity: z.number().positive().optional(),
    dcResistance25: z.number().positive().optional(),
    acResistance25: z.number().positive().optional(),
    acResistance50: z.number().positive().optional(),
    acResistance75: z.number().positive(),
    gmr: z.number().positive(),
});

export type CreateConductorTypeInput = z.infer<
    typeof createConductorTypeSchema
>;

export const defaultConductorType: CreateConductorTypeInput = {
    name: "",
    surfaceArea: 0,
    stranding: "",
    outerDiameter: 0,
    coreDiameter: 0,
    layers: 0,
    currentCapacity: 0,
    dcResistance25: 0,
    acResistance25: 0,
    acResistance50: 0,
    acResistance75: 0,
    gmr: 0,
};

// update

export const updateConductorTypeSchema = createConductorTypeSchema
    .partial()
    .extend({
        id: conductorTypeId,
    });

export type UpdateConductorTypeInput = z.infer<
    typeof updateConductorTypeSchema
>;

// getAll

export const getAllConductorTypesSchema = z
    .object({
        pageIndex: z.number(),
        pageSize: z.number(),
    })
    .optional();

export type GetAllConductorTypesInput = z.infer<
    typeof getAllConductorTypesSchema
>;

// getById

export const getConductorTypeByIdSchema = z.object({ id: conductorTypeId });

export type GetConductorTypeByIdInput = z.infer<
    typeof getConductorTypeByIdSchema
>;

// delete

export const deleteConductorTypeSchema = z.object({ id: conductorTypeId });

export type DeleteConductorTypeInput = z.infer<
    typeof deleteConductorTypeSchema
>;
