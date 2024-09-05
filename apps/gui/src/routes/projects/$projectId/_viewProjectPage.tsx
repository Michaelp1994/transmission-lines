import { Link, Outlet, createFileRoute } from "@tanstack/react-router";

// import trpc from "~/utils/trpc";

export const Route = createFileRoute("/projects/$projectId/_viewProjectPage")({
    component: ViewProjectPage,
    beforeLoad: () => {
        return {
            text: "View Project",
        };
    },
});

export default function ViewProjectPage() {
    const { projectId } = Route.useParams();
    // const exportMutation = trpc.project.export.useMutation();

    // function exportProject() {
    //     exportMutation.mutate({ id: projectId });
    // }

    return (
        <div>
            <h1>Project</h1>

            <div>
                <nav className="grid gap-4 text-sm text-muted-foreground">
                    <Link
                        activeOptions={{ exact: true }}
                        to="/projects/$projectId"
                        params={{ projectId }}
                    >
                        General
                    </Link>
                    <Link
                        to="/projects/$projectId/sources"
                        params={{ projectId }}
                    >
                        Sources
                    </Link>
                    <Link
                        to="/projects/$projectId/lines"
                        params={{ projectId }}
                    >
                        Transmission Lines
                    </Link>
                    <Link
                        to="/projects/$projectId/results"
                        params={{ projectId }}
                    >
                        Results
                    </Link>
                    <Link
                        to="/projects/$projectId/diagram"
                        params={{ projectId }}
                    >
                        Diagram
                    </Link>
                </nav>
                <div className="grid gap-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
