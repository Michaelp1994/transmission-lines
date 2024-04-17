import { RouterOutputs } from "~/utils/trpc";

export type Conductor = RouterOutputs["conductor"]["getAllByLineId"][number];
