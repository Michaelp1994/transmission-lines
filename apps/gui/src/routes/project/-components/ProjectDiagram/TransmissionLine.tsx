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
            <BaseEdge markerEnd={markerEnd} path={edgePath} style={style} />
            <EdgeLabelRenderer>
                <div>
                    <ContextMenu>
                        <ContextMenuTrigger>{data.label}</ContextMenuTrigger>
                        <ContextMenuContent>
                            <ContextMenuItem asChild>
                                <Link
                                    params={{
                                        projectId: data.projectId,
                                        lineId: data.lineId,
                                    }}
                                    to="project/transmissionLines/$lineId"
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
