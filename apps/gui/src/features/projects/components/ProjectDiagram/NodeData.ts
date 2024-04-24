import { ProjectID, SourceID } from "@repo/validators/schemas/Ids.schema";

export interface NodeData {
    label: string;
    projectId: ProjectID;
    sourceId: SourceID;
}

export type NodeType = "source";
