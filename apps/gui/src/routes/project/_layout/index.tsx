import { createFileRoute } from "@tanstack/react-router";
import { ReactFlowProvider } from "@xyflow/react";

import trpc from "~/utils/trpc";

import ProjectDiagram from "../-components/ProjectDiagram";
import { DnDProvider } from "../-components/ProjectDiagram/DnDContext";

export const Route = createFileRoute("/project/_layout/")({
    component: ProjectDiagramPage,
});

export default function ProjectDiagramPage() {
    const [sources, transmissionLines] = trpc.useQueries((t) => {
        return [t.source.getAll({}), t.transmissionLine.getAll({})];
    });

    if (sources.isLoading || transmissionLines.isLoading) {
        return <div>Loading...</div>;
    }

    if (
        sources.isError ||
        !sources.data ||
        transmissionLines.isError ||
        !transmissionLines.data
    ) {
        return <div>Error!</div>;
    }

    return (
        <ReactFlowProvider>
            <DnDProvider>
                <ProjectDiagram
                    sources={sources}
                    transmissionLines={transmissionLines}
                />
            </DnDProvider>
        </ReactFlowProvider>
    );
}