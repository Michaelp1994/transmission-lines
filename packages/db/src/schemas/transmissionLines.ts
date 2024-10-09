import type { TransmissionConductor } from "./transmissionConductors";
import type { TransmissionTower } from "./transmissionTowers";

export type TransmissionLineID = string;

export interface TransmissionLine {
    id: TransmissionLineID;
    name: string;
    fromSourceId: string;
    toSourceId: string | null;
    conductors: TransmissionConductor[];
    towers: TransmissionTower[];
}
