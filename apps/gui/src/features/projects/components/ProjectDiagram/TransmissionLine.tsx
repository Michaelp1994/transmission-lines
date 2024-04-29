import { styled } from "@linaria/react";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@repo/ui";
import { Link } from "lucide-react";
import {
    BaseEdge,
    EdgeLabelRenderer,
    EdgeProps,
    getBezierPath,
    useReactFlow,
} from "reactflow";

import { useDeleteTransmissionLineModal } from "~/utils/modals";

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
    const displayDeleteModal = useDeleteTransmissionLineModal(data.lineId);

    return (
        <>
            <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
            <EdgeLabelRenderer>
                <Wrapper labelX={labelX} labelY={labelY}>
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
                            <ContextMenuItem onClick={displayDeleteModal}>
                                Delete
                            </ContextMenuItem>
                        </ContextMenuContent>
                    </ContextMenu>
                </Wrapper>
            </EdgeLabelRenderer>
        </>
    );
}

const Wrapper = styled.div<{ labelX: number; labelY: number }>`
    position: absolute;
    background-color: white;
    padding: 1rem;
    border-radius: 5px;
    border: 1px solid black;
    transform: translate(-50%, -50%)
        translate(${(props) => props.labelX}px, ${(props) => props.labelY}px);
    font-size: 12px;
`;