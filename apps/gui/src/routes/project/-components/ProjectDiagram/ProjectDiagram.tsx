import { useCallback, useMemo, useState } from "react";
import ReactFlow, {
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    Background,
    BackgroundVariant,
    Controls,
    type Edge,
    type Node,
    ReactFlowProvider,
    useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";

import toast from "@repo/ui/toast";
import trpc from "~/utils/trpc";

import type { NodeData, NodeType } from "./NodeData";

import { DnDProvider, useDnD } from "./DnDContext";
import Sidebar from "./Sidebar";
import Source from "./Source";
import TransmissionLine from "./TransmissionLine";

interface ProjectDiagramProps {}

const nodeTypes = { source: Source };

const edgeTypes = { default: TransmissionLine };

let id = 0;
const getId = () => `dndnode_${id++}`;

export default function ProjectDiagram({}: ProjectDiagramProps) {
    const [dirty, setDirty] = useState(false);
    const { data, isLoading, isError } = trpc.project.getCurrent.useQuery({});
    const utils = trpc.useUtils();
    const [type] = useDnD();
    const { screenToFlowPosition } = useReactFlow();
    const mutation = trpc.source.updatePosition.useMutation({
        onSuccess() {
            toast.success("Saved");
            // utils.project.getById.invalidate();
        },
    });

    const initialNodes: Node<NodeData, NodeType>[] = useMemo(() => {
        return data?.sources.map((source) => {
            return {
                id: source.id,
                type: "source",
                position: { x: source.x, y: source.y },
                data: {
                    label: source.name,
                    sourceId: source.id,
                },
            };
        });
    }, [data]);

    const initialEdges: Edge[] = useMemo(() => {
        return data?.transmissionLines.map((tline) => {
            return {
                id: tline.id,
                source: tline.fromSourceId,
                target: tline.toSourceId,
                type: "default",
                data: {
                    label: tline.name,
                    lineId: tline.id,
                },
            };
        });
    }, [data]);

    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    const onConnect = useCallback(
        (params) => {
            setEdges((eds) => addEdge(params, eds));
        },
        [setEdges]
    );

    const onNodesChange = useCallback((changes) => {
        setDirty(true);

        setNodes((nds) => applyNodeChanges(changes, nds));
    }, []);

    const onEdgesChange = useCallback((changes) => {
        setEdges((eds) => applyEdgeChanges(changes, eds));
    }, []);

    function handleSave() {
        setDirty(false);
        const changes = nodes.map((node) => {
            return {
                id: node.id,
                x: node.position.x,
                y: node.position.y,
            };
        });

        mutation.mutate(changes);
    }

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            if (!type) {
                return;
            }

            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });
            const newNode = {
                id: getId(),
                type,
                position,
                data: { label: `${type} node` },
            };
            setNodes((nds) => nds.concat(newNode));
        },
        [screenToFlowPosition, type]
    );

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError || !data) {
        return <div>Error!</div>;
    }

    return (
        <div className="flex h-full w-full gap-4">
            <Sidebar />
            <div className="w-full h-full">
                <ReactFlow
                    edges={edges}
                    edgeTypes={edgeTypes}
                    nodes={nodes}
                    nodeTypes={nodeTypes}
                    onConnect={onConnect}
                    onDragOver={onDragOver}
                    onDrop={onDrop}
                    onEdgesChange={onEdgesChange}
                    onNodesChange={onNodesChange}
                >
                    <Controls />
                    <Background
                        gap={12}
                        size={1}
                        variant={BackgroundVariant.Dots}
                    />
                </ReactFlow>
            </div>
        </div>
    );
}
