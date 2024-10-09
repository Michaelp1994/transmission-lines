import type { ProjectID, SourceID } from "@repo/validators/Ids";

export interface NodeData {
    label: string;
    projectId: ProjectID;
    sourceId: SourceID;
}

export type NodeType = "source";
