import * as z from "zod";
import { transmissionLineSchema } from "./TransmissionLine.schema";
import { transmissionTowerSchema } from "./TransmissionTower.schema";

export const faultLocation = z.object({
    transmissionLine: transmissionLineSchema.shape.id,
    tower: transmissionTowerSchema.shape.id,
});

export const towerFaultSchema = z.object({
    location: faultLocation,
});

export type FaultLocation = z.infer<typeof faultLocation>;

export type TowerFaultInput = z.infer<typeof towerFaultSchema>;
