import { Link, Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tower-geometries/$geometryId/_layout")({
    component: ViewTowerGeometryPage,
    beforeLoad: () => {
        return {
            text: "View Tower Geometry",
        };
    },
});

export default function ViewTowerGeometryPage() {
    const { geometryId } = Route.useParams();

    return (
        <div className="mx-8">
            <h1>Tower Geometry</h1>
            <div>
                <nav className="grid gap-4 text-sm text-muted-foreground">
                    <Link
                        to="/tower-geometries/$geometryId"
                        params={{ geometryId }}
                        activeOptions={{ exact: true }}
                    >
                        General
                    </Link>
                    <Link
                        to="/tower-geometries/$geometryId/conductors"
                        params={{ geometryId }}
                    >
                        Conductors
                    </Link>
                </nav>
                <div className="grid gap-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
