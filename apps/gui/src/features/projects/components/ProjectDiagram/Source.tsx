import { styled } from "@linaria/react";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@repo/ui";
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
            <Wrapper>
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
            </Wrapper>
            <Handle type="source" position={Position.Right} />
        </>
    );
}

const Wrapper = styled.div`
    border: 1px solid black;
    border-radius: 5px;
    padding: 1rem;
    background-color: white;
`;
