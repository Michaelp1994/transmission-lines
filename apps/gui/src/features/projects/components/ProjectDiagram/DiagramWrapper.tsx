import { ProjectID } from "@repo/validators/schemas/Ids.schema";

import ProjectDiagram from "./ProjectDiagram";

import trpc from "~/utils/trpc";

interface DiagramWrapperProps {
    projectId: ProjectID;
}

export default function DiagramWrapper({ projectId }: DiagramWrapperProps) {
    const { data, error, isLoading } = trpc.project.getById.useQuery({
        id: projectId,
    });
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error || !data) {
        return <div>Error</div>;
    }

    return <ProjectDiagram data={data} />;
}
