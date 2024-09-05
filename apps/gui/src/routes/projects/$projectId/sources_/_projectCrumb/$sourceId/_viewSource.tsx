import { Link, Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
    "/projects/$projectId/sources/_projectCrumb/$sourceId/_viewSource"
)({
    component: ViewTransmissionLinePage,
    beforeLoad: () => {
        return {
            text: "Sources",
        };
    },
});

export default function ViewTransmissionLinePage() {
    const { projectId, sourceId } = Route.useParams();

    return (
        <div>
            <h1>Source</h1>
            <div>
                <nav className="grid gap-4 text-sm text-muted-foreground">
                    <Link
                        to="/projects/$projectId/sources/$sourceId"
                        params={{ projectId, sourceId }}
                        activeOptions={{ exact: true }}
                    >
                        General
                    </Link>
                    <Link
                        to="/projects/$projectId/sources/$sourceId/electrical"
                        params={{ projectId, sourceId }}
                    >
                        Electrical Properties
                    </Link>
                    <Link
                        to="/projects/$projectId/sources/$sourceId/sequence"
                        params={{ projectId, sourceId }}
                    >
                        Sequence
                    </Link>
                </nav>
                <div className="grid gap-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
