import * as z from "zod";

export const transmissionTowerInputSchema = z.object({
    name: z.string().min(2).max(50).trim(),
    resistance: z.number(),
    distance: z.number(),
    geometryId: z.coerce
        .number()
        .positive({ message: "Please select a geometry type" }),
});

export const transmissionTowerSchema = transmissionTowerInputSchema.extend({
    id: z.number(),
});

export type TransmissionTowerInput = z.infer<
    typeof transmissionTowerInputSchema
>;

export type TransmissionTower = z.infer<typeof transmissionTowerSchema>;

export const defaultTransmissionTower: TransmissionTowerInput = {
    name: "",
    resistance: 15,
    distance: 1,
    geometryId: 0,
};
