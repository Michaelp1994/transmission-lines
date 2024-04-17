import { RouterOutputs } from "~/utils/trpc";

export type TransmissionTower =
    RouterOutputs["tower"]["getAllByLineId"][number];
