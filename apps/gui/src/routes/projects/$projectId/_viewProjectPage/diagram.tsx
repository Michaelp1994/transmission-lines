import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { createFileRoute } from "@tanstack/react-router";
import { ProjectDiagram } from "~/features/projects";

export const Route = createFileRoute(
    "/projects/$projectId/_viewProjectPage/diagram"
)({
    component: Diagram,
});

export default function Diagram() {
    const { projectId } = Route.useParams();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Diagram</CardTitle>
            </CardHeader>

            <CardContent>
                <ProjectDiagram projectId={projectId} />
            </CardContent>
        </Card>
    );
}
