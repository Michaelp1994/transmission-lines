import * as z from "zod";

import { conductorTypeId, lineId } from "./Ids.schema";

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
