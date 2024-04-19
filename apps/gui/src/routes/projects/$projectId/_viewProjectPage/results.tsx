import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
    "/projects/$projectId/_viewProjectPage/results"
)({
    component: () => (
        <div>Hello /projects/$projectId/_viewProjectPage/results!</div>
    ),
});
