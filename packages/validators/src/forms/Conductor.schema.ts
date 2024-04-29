import { z } from "zod";

import { conductorTypeId } from "../Ids.schema";

// create / update

export const conductorFormSchema = z.object({
    name: z.string().min(2).max(50).trim(),
    fromPhase: z.number().nonnegative(),
    toPhase: z.number().nonnegative(),
    bundleNumber: z.number().min(1),
    bundleSpacing: z.number().nonnegative(),
    isNeutral: z.boolean(),
    typeId: conductorTypeId,
});

export type ConductorFormInput = z.infer<typeof conductorFormSchema>;

export const defaultConductor: ConductorFormInput = {
    name: "",
    fromPhase: 0,
    toPhase: 0,
    isNeutral: false,
    bundleNumber: 1,
    bundleSpacing: 0,
    typeId: "",
};

// generate conductors

export const generateConductorsFormSchema = z.object({
    phases: z.number().positive(),
    circuits: z.number().positive(),
    neutrals: z.number().positive(),
    phaseTypeId: conductorTypeId,
    neutralTypeId: conductorTypeId,
});

export type GenerateConductorsFormInput = z.infer<
    typeof generateConductorsFormSchema
>;

export const defaultGenerateFormConductors: GenerateConductorsFormInput = {
    phaseTypeId: "",
    neutralTypeId: "",
    phases: 3,
    circuits: 2,
    neutrals: 2,
};
