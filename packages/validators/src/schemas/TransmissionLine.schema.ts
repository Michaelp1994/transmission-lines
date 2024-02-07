import * as z from "zod";

import {
    conductorInputSchema,
    conductorSchema,
    defaultConductor,
} from "./Conductor.schema";
import {
    transmissionTowerInputSchema,
    defaultTransmissionTower,
    transmissionTowerSchema,
} from "./TransmissionTower.schema";

export const transmissionLineInputSchema = z.object({
    name: z.string().min(2).max(50).trim(),
    fromSource: z.string().min(1, { message: "Please select a source" }),
    toSource: z.string().optional(),
    conductors: conductorInputSchema
        .array()
        .refine(
            (conductors) =>
                new Set(conductors.map((conductor) => conductor.name)).size ===
                conductors.length,
            { message: "Please ensure your conductors have unique names." }
        ),
    towers: transmissionTowerInputSchema
        .array()
        .refine(
            (towers) =>
                new Set(towers.map((tower) => tower.name)).size ===
                towers.length,
            { message: "Please ensure your towers have unique names." }
        ),
});

export type TransmissionLineInput = z.infer<typeof transmissionLineInputSchema>;

export const transmissionLineSchema = transmissionLineInputSchema.extend({
    id: z.string().uuid(),
});

export type TransmissionLine = z.infer<typeof transmissionLineSchema>;

// export const updateTransmissionLineSchema = z.object({
//     id: z.string().uuid(),
//     transmissionLine: transmissionLineInputSchema,
// });

export const defaultTransmissionLine: TransmissionLineInput = {
    name: "",
    fromSource: "",
    toSource: "",
    conductors: [
        {
            ...defaultConductor,
        },
    ],
    towers: [
        {
            ...defaultTransmissionTower,
        },
    ],
};
