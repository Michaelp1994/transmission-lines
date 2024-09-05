import { Link, Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/conductor-types/$typeId/_layout")({
    component: ViewConductorTypePage,
    beforeLoad: () => {
        return {
            text: "View Conductor Type",
        };
    },
});

export default function ViewConductorTypePage() {
    const { typeId } = Route.useParams();

    return (
        <div>
            <h1>Conductor Type</h1>
            <div>
                <nav className="grid gap-4 text-sm text-muted-foreground">
                    <Link
                        to="/conductor-types/$typeId"
                        params={{ typeId }}
                        activeOptions={{ exact: true }}
                    >
                        General
                    </Link>
                    <Link
                        to="/conductor-types/$typeId/properties"
                        params={{ typeId }}
                    >
                        Properties
                    </Link>
                </nav>
                <div className="grid gap-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
