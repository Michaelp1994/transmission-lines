import * as z from "zod";

import { conductorId, conductorTypeId, lineId } from "./Ids.schema";

/** @see https://github.com/aiji42/zod-i18n for Internationalization */

export const createConductorSchema = z.object({
    name: z.string().min(2).max(50).trim(),
    fromPhase: z.number().nonnegative(),
    toPhase: z.number().nonnegative(),
    bundleNumber: z.number().min(1),
    bundleSpacing: z.number().nonnegative(),
    isNeutral: z.boolean(),
    typeId: conductorTypeId,
    lineId,
});

export type CreateConductorInput = z.infer<typeof createConductorSchema>;

export const defaultConductor: CreateConductorInput = {
    name: "",
    fromPhase: 0,
    toPhase: 0,
    isNeutral: false,
    bundleNumber: 1,
    bundleSpacing: 0,
    typeId: "",
    lineId: "",
};

// generate

export const generateConductorsSchema = z.object({
    lineId,
    phases: z.number().positive(),
    circuits: z.number().positive(),
    neutrals: z.number().positive(),
    phaseTypeId: conductorTypeId,
    neutralTypeId: conductorTypeId,
});

export type GenerateConductorsInput = z.infer<typeof generateConductorsSchema>;

export const defaultGenerateConductors: GenerateConductorsInput = {
    lineId: "",
    phaseTypeId: "",
    neutralTypeId: "",
    phases: 3,
    circuits: 2,
    neutrals: 2,
};

// getAll
export const getAllConductorsSchema = z.object({}).optional();

export type GetAllConductorsInput = z.infer<typeof getAllConductorsSchema>;

// getAllByLineId

export const getAllConductorsByLineIdSchema = z.object({
    lineId,
});

export type GetAllConductorsByLineIdInput = z.infer<
    typeof getAllConductorsByLineIdSchema
>;

// getById

export const getConductorByIdSchema = z.object({ id: conductorId });

export type GetConductorByIdInput = z.infer<typeof getConductorByIdSchema>;

// update

export const updateConductorSchema = createConductorSchema.extend({
    id: conductorId,
});

export type UpdateConductorInput = z.infer<typeof updateConductorSchema>;

// delete

export const deleteConductorSchema = z.object({ id: conductorId });

export type DeleteConductorInput = z.infer<typeof deleteConductorSchema>;
