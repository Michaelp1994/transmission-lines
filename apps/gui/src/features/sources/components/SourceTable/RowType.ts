import { RouterOutputs } from "@/utils/trpc";

export type Source = RouterOutputs["source"]["getAllByProjectId"][number];
