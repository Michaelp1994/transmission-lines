import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/projects/$projectId/lines/_projectCrumb")({
    component: () => <Outlet />,
    beforeLoad: () => ({
        text: "View Project",
    }),
});