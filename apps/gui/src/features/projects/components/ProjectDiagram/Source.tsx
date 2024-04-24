import { styled } from "@linaria/react";
import { Link } from "@tanstack/react-router";
import { Handle, Position } from "reactflow";

import { NodeData } from "./NodeData";

interface SourceProps {
    data: NodeData;
}

export default function Source({ data }: SourceProps) {
    return (
        <>
            <Handle type="target" position={Position.Left} />
            <Link
                to="/projects/$projectId/sources/$sourceId"
                params={{ projectId: data.projectId, sourceId: data.sourceId }}
            >
                <Wrapper>{data.label}</Wrapper>
            </Link>
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
