import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
    "/projects/$projectId/_viewProjectPage/results"
)({
    component: ResultsPage,
});

export default function ResultsPage() {
    const { projectId } = Route.useParams();

    return (
        <div>Hello / projects / {projectId} / _viewProjectPage / results!</div>
    );
}
