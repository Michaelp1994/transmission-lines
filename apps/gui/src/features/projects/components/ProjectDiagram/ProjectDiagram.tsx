import { styled } from "@linaria/react";
import { useCallback, useMemo } from "react";
import ReactFlow, {
    Background,
    BackgroundVariant,
    Controls,
    Edge,
    Node,
    addEdge,
    useEdgesState,
    useNodesState,
} from "reactflow";

import "reactflow/dist/style.css";
import { NodeData, NodeType } from "./NodeData";
import Source from "./Source";

import { RouterOutputs } from "~/utils/trpc";

interface ProjectDiagramProps {
    data: RouterOutputs["project"]["getById"];
}

const nodeTypes = { source: Source };

export default function ProjectDiagram({ data }: ProjectDiagramProps) {
    const initialNodes: Node<NodeData, NodeType>[] = useMemo(
        () =>
            data.sources.map((source, num) => ({
                id: source.id,
                type: "source",
                position: { x: num, y: num },
                data: {
                    label: source.name,
                    projectId: source.projectId,
                    sourceId: source.id,
                },
            })),
        [data.sources]
    );

    const initialEdges: Edge[] = useMemo(
        () =>
            data.transmissionLines.map((tline) => ({
                id: tline.id,
                source: tline.fromSourceId,
                target: tline.toSourceId!,
            })),
        [data.transmissionLines]
    );

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    return (
        <Wrapper>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
            >
                <Controls />
                {/* <MiniMap /> */}
                <Background
                    variant={BackgroundVariant.Dots}
                    gap={12}
                    size={1}
                />
            </ReactFlow>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    height: 500px;
    border: 1px solid black;
`;
