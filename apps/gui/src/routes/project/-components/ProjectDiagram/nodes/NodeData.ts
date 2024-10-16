import type { SourceID } from "@repo/validators/Ids";

export interface NodeData {
    label: string;
    sourceId: SourceID;
}

export type NodeType = "source";
