import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@repo/ui/context-menu";
import { Link } from "@tanstack/react-router";
import { Handle, Position } from "reactflow";
import type { NodeData } from "./NodeData";
import { useDeleteSourceModal } from "~/utils/modals";

interface SourceProps {
    data: NodeData;
}

export default function Source({ data }: SourceProps) {
    const displayDeleteModal = useDeleteSourceModal(data.sourceId);

    return (
        <>
            <Handle type="target" position={Position.Left} />
            <div>
                <ContextMenu>
                    <ContextMenuTrigger>{data.label}</ContextMenuTrigger>
                    <ContextMenuContent>
                        <ContextMenuItem asChild>
                            <Link
                                to="/projects/$projectId/sources/$sourceId"
                                params={{
                                    projectId: data.projectId,
                                    sourceId: data.sourceId,
                                }}
                            >
                                View
                            </Link>
                        </ContextMenuItem>
                        <ContextMenuItem onClick={displayDeleteModal}>
                            Delete
                        </ContextMenuItem>
                    </ContextMenuContent>
                </ContextMenu>
            </div>
            <Handle type="source" position={Position.Right} />
        </>
    );
}
