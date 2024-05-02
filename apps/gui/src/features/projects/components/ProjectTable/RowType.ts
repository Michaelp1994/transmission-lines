import type { RouterOutputs } from "~/utils/trpc";

export type Project = RouterOutputs["project"]["getAll"][number];
