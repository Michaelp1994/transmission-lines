import type { Source } from "@repo/db/project/sources";
import type { TransmissionLine } from "@repo/db/project/transmissionLines";

import toast from "@repo/ui/toast";
import {
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    Background,
    BackgroundVariant,
    Controls,
    type Edge,
    type Node,
    ReactFlow,
    useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useMemo, useState } from "react";

import trpc from "~/utils/trpc";

import { useDnD } from "./DnDContext";
import nodeTypes from "./nodes";
import Sidebar from "./Sidebar";

let id = 0;
const getId = () => `dndnode_${id++}`;

export default function ProjectDiagram({
    sources,
    transmissionLines,
}: {
    sources: Source[];
    transmissionLines: TransmissionLine[];
}) {
    const [dirty, setDirty] = useState(false);
    const [type] = useDnD();
    const { screenToFlowPosition } = useReactFlow();
    const mutation = trpc.source.updatePosition.useMutation({
        onSuccess() {
            toast.success("Saved");
        },
    });

    const initialNodes: Node<NodeData, NodeType>[] = useMemo(() => {
        return sources.data?.map((source) => {
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
    }, [sources.data]);

    const initialEdges: Edge[] = useMemo(() => {
        return transmissionLines.data?.map((tline) => {
            return {
                id: tline.id,
                source: tline.fromSourceId,
                target: tline.toSourceId,
                label: tline.name,
                data: {
                    label: tline.name,
                    lineId: tline.id,
                },
            };
        });
    }, [transmissionLines.data]);

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

    return (
        <div className="flex h-full w-full gap-4">
            <Sidebar isDirty={dirty} onSave={handleSave} />
            <div className="w-full h-full">
                <ReactFlow
                    edges={edges}
                    nodes={nodes}
                    nodeTypes={nodeTypes}
                    // onConnect={onConnect}
                    onDragOver={onDragOver}
                    onDrop={onDrop}
                    // onEdgesChange={onEdgesChange}
                    onNodesChange={onNodesChange}
                    proOptions={{ hideAttribution: true }}
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
