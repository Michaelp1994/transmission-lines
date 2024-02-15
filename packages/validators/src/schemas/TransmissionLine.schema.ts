import * as z from "zod";

import {
    createConductorSchema,
    defaultConductor,
    updateConductorSchema,
} from "./Conductor.schema";
import { lineId, projectId } from "./Ids.schema";
import {
    createTransmissionTowerSchema,
    defaultTransmissionTower,
    updateTransmissionTowerSchema,
} from "./TransmissionTower.schema";

// create

export const createTransmissionLineSchema = z.object({
    name: z.string().min(2).max(50).trim(),
    fromSourceId: z.string().min(1, { message: "Please select a Source" }),
    toSourceId: z.string().optional(),
    projectId,
    conductors: createConductorSchema
        .array()
        .refine(
            (conductors) =>
                new Set(conductors.map((conductor) => conductor.name)).size ===
                conductors.length,
            { message: "Please ensure your conductors have unique names." }
        ),
    towers: createTransmissionTowerSchema
        .array()
        .refine(
            (towers) =>
                new Set(towers.map((tower) => tower.name)).size ===
                towers.length,
            { message: "Please ensure your towers have unique names." }
        ),
});

export type CreateTransmissionLineInput = z.infer<
    typeof createTransmissionLineSchema
>;

export const defaultTransmissionLine: CreateTransmissionLineInput = {
    name: "",
    fromSourceId: "",
    toSourceId: "",
    projectId: "",
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

// update

export const updateTransmissionLineSchema = createTransmissionLineSchema.extend(
    {
        id: lineId,
        towers: z.array(
            createTransmissionTowerSchema.or(updateTransmissionTowerSchema)
        ),
        conductors: z.array(createConductorSchema.or(updateConductorSchema)),
    }
);

export type UpdateTransmissionLineInput = z.infer<
    typeof updateTransmissionLineSchema
>;

// getAllTransmissionLines

export const getAllTransmissionLinesSchema = z.object({
    projectId,
});

export type GetAllTransmissionLinesInput = z.infer<
    typeof getAllTransmissionLinesSchema
>;

// getById

export const getTransmissionLineByIdSchema = z.object({
    id: lineId,
});

export type GetTransmissionLineByIdInput = z.infer<
    typeof getTransmissionLineByIdSchema
>;

// delete

export const deleteTransmissionLineSchema = z.object({ id: lineId });

export type DeleteTransmissionLineInput = z.infer<
    typeof deleteTransmissionLineSchema
>;

// getTransmissionLineParametersSchema
export const getTransmissionLineParametersSchema = z.object({ id: lineId });

export type GetTransmissionLineParametersInput = z.infer<
    typeof getTransmissionLineParametersSchema
>;
