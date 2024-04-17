import { RouterOutputs } from "~/utils/trpc";

export type TransmissionLine =
    RouterOutputs["transmissionLine"]["getAllByProjectId"][number];
