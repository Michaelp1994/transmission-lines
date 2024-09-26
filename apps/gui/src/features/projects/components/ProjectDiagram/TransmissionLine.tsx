import NiceModal from "@ebay/nice-modal-react";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@repo/ui/context-menu";
import { Link } from "@tanstack/react-router";
import {
    BaseEdge,
    EdgeLabelRenderer,
    type EdgeProps,
    getBezierPath,
    useReactFlow,
} from "reactflow";

export default function TransmissionLine({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
    data,
}: EdgeProps) {
    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });
    function showDeleteModal() {
        NiceModal.show("delete-transmission-line", {
            lineId: data.lineId,
        });
    }
    return (
        <>
            <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
            <EdgeLabelRenderer>
                <div>
                    <ContextMenu>
                        <ContextMenuTrigger>{data.label}</ContextMenuTrigger>
                        <ContextMenuContent>
                            <ContextMenuItem asChild>
                                <Link
                                    to="/projects/$projectId/transmissionLines/$lineId"
                                    params={{
                                        projectId: data.projectId,
                                        lineId: data.lineId,
                                    }}
                                >
                                    View
                                </Link>
                            </ContextMenuItem>
                            <ContextMenuItem>Delete</ContextMenuItem>
                        </ContextMenuContent>
                    </ContextMenu>
                </div>
            </EdgeLabelRenderer>
        </>
    );
}
