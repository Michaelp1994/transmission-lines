import { styled } from "@linaria/react";
import { Button } from "@repo/ui";
import { useCallback, useMemo, useState } from "react";
import ReactFlow, {
    Background,
    BackgroundVariant,
    Controls,
    Edge,
    Node,
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
} from "reactflow";

import "reactflow/dist/style.css";
import { NodeData, NodeType } from "./NodeData";
import Source from "./Source";
import TransmissionLine from "./TransmissionLine";

import { ButtonsWrapper } from "~/components/StyledForm";
import toast from "~/utils/toast";
import trpc, { RouterOutputs } from "~/utils/trpc";

interface ProjectDiagramProps {
    sources: RouterOutputs["source"]["getAllByProjectId"];
    transmissionLines: RouterOutputs["transmissionLine"]["getAllByProjectId"];
}

const nodeTypes = { source: Source };

const edgeTypes = { default: TransmissionLine };

export default function ProjectDiagram({
    sources,
    transmissionLines,
}: ProjectDiagramProps) {
    const [dirty, setDirty] = useState(false);
    const utils = trpc.useUtils();
    const mutation = trpc.source.updatePosition.useMutation({
        onSuccess() {
            toast.success("Saved");
            utils.project.getById.invalidate();
        },
    });

    const initialNodes: Node<NodeData, NodeType>[] = useMemo(
        () =>
            sources.map((source) => ({
                id: source.id,
                type: "source",
                position: { x: source.x, y: source.y },
                data: {
                    label: source.name,
                    projectId: source.projectId,
                    sourceId: source.id,
                },
            })),
        [sources]
    );

    const initialEdges: Edge[] = useMemo(
        () =>
            transmissionLines.map((tline) => ({
                id: tline.id,
                source: tline.fromSourceId,
                target: tline.toSourceId!,
                type: "default",
                data: {
                    label: tline.name,
                    projectId: tline.projectId,
                    lineId: tline.id,
                },
            })),
        [transmissionLines]
    );

    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    const onNodesChange = useCallback((changes) => {
        setDirty(true);
        return setNodes((nds) => applyNodeChanges(changes, nds));
    }, []);
    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        []
    );

    function handleSave() {
        setDirty(false);
        const changes = nodes.map((node) => ({
            id: node.id,
            x: node.position.x,
            y: node.position.y,
        }));
        mutation.mutate(changes);
    }
    return (
        <>
            <DiagramWrapper>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    nodeTypes={nodeTypes}
                    edgeTypes={edgeTypes}
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
            </DiagramWrapper>
            <ButtonsWrapper>
                <Button onClick={handleSave} disabled={!dirty}>
                    Save
                </Button>
            </ButtonsWrapper>
        </>
    );
}

const DiagramWrapper = styled.div`
    display: flex;
    height: 500px;
    border: 1px solid black;
    margin-bottom: 1rem;
`;
