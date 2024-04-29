import { ProjectID } from "@repo/validators/Ids";

import ProjectDiagram from "./ProjectDiagram";

import trpc from "~/utils/trpc";

interface DiagramWrapperProps {
    projectId: ProjectID;
}

export default function DiagramWrapper({ projectId }: DiagramWrapperProps) {
    // const { data, error, isLoading } = trpc.source.getAllByProjectId.useQuery({
    //     projectId,
    // });

    const [sources, transmissionLines] = trpc.useQueries((t) => [
        t.source.getAllByProjectId({ projectId }),
        t.transmissionLine.getAllByProjectId({ projectId }),
    ]);

    if (sources.isLoading || transmissionLines.isLoading) {
        return <div>Loading...</div>;
    }
    if (
        sources.error ||
        !sources.data ||
        transmissionLines.error ||
        !transmissionLines.data
    ) {
        return <div>Error</div>;
    }

    return (
        <ProjectDiagram
            sources={sources.data}
            transmissionLines={transmissionLines.data}
        />
    );
}
