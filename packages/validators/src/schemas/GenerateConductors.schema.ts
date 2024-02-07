import * as z from "zod";

export const generateConductorsSchema = z.object({
    phases: z.number().positive(),
    circuits: z.number().positive(),
    neutrals: z.number().positive(),
    phaseConductorTypeId: z.number().positive(),
    neutralConductorTypeId: z.number().positive(),
});

export type GenerateConductorsInput = z.infer<typeof generateConductorsSchema>;

export const defaultGenerateConductors: GenerateConductorsInput = {
    phases: 3,
    circuits: 2,
    neutrals: 2,
    phaseConductorTypeId: 1,
    neutralConductorTypeId: 1,
};
