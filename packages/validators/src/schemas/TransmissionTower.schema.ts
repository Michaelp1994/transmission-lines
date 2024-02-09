import * as z from "zod";

// create

export const createTransmissionTowerSchema = z.object({
    name: z.string().min(2).max(50).trim(),
    resistance: z.number(),
    distance: z.number(),
    geometryId: z.coerce
        .number()
        .positive({ message: "Please select a geometry type" }),
});

export type CreateTransmissionTowerInput = z.infer<
    typeof createTransmissionTowerSchema
>;

// update

export const updateTransmissionTowerSchema =
    createTransmissionTowerSchema.extend({
        id: z.number(),
    });

export type UpdateTransmissionTowerInput = z.infer<
    typeof updateTransmissionTowerSchema
>;

export const defaultTransmissionTower: CreateTransmissionTowerInput = {
    name: "",
    resistance: 15,
    distance: 1,
    geometryId: 0,
};
