import * as z from "zod";

import { geometryId, lineId, towerId } from "./Ids.schema";

// create

export const createTransmissionTowerSchema = z.object({
    name: z.string().min(2).max(50).trim(),
    resistance: z.number(),
    distance: z.number(),
    lineId,
    geometryId,
});

export type CreateTransmissionTowerInput = z.infer<
    typeof createTransmissionTowerSchema
>;

export const defaultTransmissionTower: CreateTransmissionTowerInput = {
    name: "",
    resistance: 15,
    distance: 1,
    geometryId: "",
    lineId: "",
};

// getAllTowersByLineId

export const getTowersByLineIdSchema = z.object({
    lineId,
});

// getTowerByIdSchema

export const getTowerByIdSchema = z.object({
    id: towerId,
});
export type GetTowerByIdInput = z.infer<typeof getTowerByIdSchema>;

// update

export const updateTransmissionTowerSchema =
    createTransmissionTowerSchema.extend({
        id: towerId,
    });

export type UpdateTransmissionTowerInput = z.infer<
    typeof updateTransmissionTowerSchema
>;

// generate

export const generateTowersSchema = z.object({
    namePrefix: z.string().min(1),
    numTowers: z.number().positive(),
    resistance: z.number().positive(),
    distance: z.number().positive(),
    geometryId,
    lineId,
});

export type GenerateTowersInput = z.infer<typeof generateTowersSchema>;

export const defaultGenerateTowers: GenerateTowersInput = {
    namePrefix: "T",
    geometryId: "",
    numTowers: 10,
    resistance: 15,
    distance: 10,
    lineId: "",
};

// getTowerParameters

export const getTowerParametersSchema = z.object({
    id: towerId,
});

export type GetTowerParametersInput = z.infer<typeof getTowerParametersSchema>;

// delete

export const deleteTransmissionTowerSchema = z.object({
    id: towerId,
});

export type DeleteTransmissionTowerInput = z.infer<
    typeof deleteTransmissionTowerSchema
>;
