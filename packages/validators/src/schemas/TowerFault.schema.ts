import * as z from "zod";
import { updateTransmissionTowerSchema } from "./TransmissionTower.schema";

export const faultLocation = z.object({
    transmissionLine: z.string().uuid(),
    tower: updateTransmissionTowerSchema.shape.id,
});

export const towerFaultSchema = z.object({
    location: faultLocation,
});

export type FaultLocation = z.infer<typeof faultLocation>;

export type TowerFaultInput = z.infer<typeof towerFaultSchema>;
