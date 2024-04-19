import {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardHeaderActions,
    CardHeaderText,
    CardTitle,
} from "@repo/ui";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { TowerGeometriesTable } from "~/features/towerGeometries";

export const Route = createFileRoute("/tower-geometries/")({
    component: AllTowerGeometriesPage,
    beforeLoad: () => ({
        text: "Tower Geometries",
    }),
});

export default function AllTowerGeometriesPage() {
    const { t } = useTranslation("towerGeometry");

    return (
        <Card>
            <CardHeader>
                <CardHeaderText>
                    <CardTitle>Tower Geometries</CardTitle>
                    <CardDescription>
                        Tower Geometries in the database
                    </CardDescription>
                </CardHeaderText>
                <CardHeaderActions>
                    <Button asChild>
                        <Link to="/tower-geometries/new">
                            {t("add.buttonText")}
                        </Link>
                    </Button>
                </CardHeaderActions>
            </CardHeader>
            <CardContent>
                <TowerGeometriesTable />
            </CardContent>
        </Card>
    );
}
