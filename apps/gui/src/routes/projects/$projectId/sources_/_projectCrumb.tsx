import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
    "/projects/$projectId/sources/_projectCrumb"
)({
    component: () => <Outlet />,
    beforeLoad: () => {
        return {
            text: "View Project",
        };
    },
});
