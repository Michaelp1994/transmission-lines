import { Link, Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
    "/projects/$projectId/lines/_projectCrumb/$lineId/_viewLine"
)({
    component: ViewTransmissionLinePage,
    beforeLoad: () => {
        return {
            text: "Transmission Line",
        };
    },
});

export default function ViewTransmissionLinePage() {
    const { projectId, lineId } = Route.useParams();

    return (
        <div>
            <h1>Transmission Line</h1>
            <div>
                <nav className="grid gap-4 text-sm text-muted-foreground">
                    <Link
                        to="/projects/$projectId/lines/$lineId"
                        params={{ projectId, lineId }}
                        activeOptions={{ exact: true }}
                    >
                        General
                    </Link>
                    <Link
                        to="/projects/$projectId/lines/$lineId/conductors"
                        params={{ projectId, lineId }}
                    >
                        Conductors
                    </Link>
                    <Link
                        to="/projects/$projectId/lines/$lineId/towers"
                        params={{ projectId, lineId }}
                    >
                        Towers
                    </Link>
                </nav>
                <div className="grid gap-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
