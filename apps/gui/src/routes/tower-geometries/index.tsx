import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardToolbar,
    CardWrapper,
} from "@repo/ui/card";
import { Button } from "@repo/ui/button";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { TowerGeometriesTable } from "~/features/towerGeometries";

export const Route = createFileRoute("/tower-geometries/")({
    component: AllTowerGeometriesPage,
    beforeLoad: () => {
        return {
            text: "Tower Geometries",
        };
    },
});

export default function AllTowerGeometriesPage() {
    const { t } = useTranslation("towerGeometry");

    return (
        <CardWrapper>
            <CardToolbar>
                <Button asChild>
                    <Link to="/tower-geometries/new">
                        {t("add.buttonText")}
                    </Link>
                </Button>
            </CardToolbar>
            <Card>
                <CardHeader>
                    <CardTitle>Tower Geometries</CardTitle>
                    <CardDescription>
                        Tower Geometries in the database
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <TowerGeometriesTable />
                </CardContent>
            </Card>
        </CardWrapper>
    );
}
