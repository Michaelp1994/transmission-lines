import { createFileRoute } from "@tanstack/react-router";
import { ReactFlowProvider } from "reactflow";

import ProjectDiagram from "../-components/ProjectDiagram";
import { DnDProvider } from "../-components/ProjectDiagram/DnDContext";

export const Route = createFileRoute("/project/_layout/diagram")({
    component: ProjectDiagramPage,
});

export default function ProjectDiagramPage() {
    return (
        <ReactFlowProvider>
            <DnDProvider>
                <ProjectDiagram />
            </DnDProvider>
        </ReactFlowProvider>
    );
}
