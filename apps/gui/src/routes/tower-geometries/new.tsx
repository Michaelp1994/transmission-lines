import {
    Card,
    CardContent,
    CardHeader,
    CardHeaderText,
    CardTitle,
} from "@repo/ui";
import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { CreateTowerGeometryForm } from "~/features/towerGeometries";

export const Route = createFileRoute("/tower-geometries/new")({
    component: CreateTowerGeometryPage,
    beforeLoad: () => {
        return {
            text: "New Tower Geometry",
        };
    },
});

export default function CreateTowerGeometryPage() {
    const { t } = useTranslation("towerGeometry");

    return (
        <Card>
            <CardHeader>
                <CardHeaderText>
                    <CardTitle>{t("add.title")}</CardTitle>
                </CardHeaderText>
            </CardHeader>
            <CardContent>
                <CreateTowerGeometryForm />
            </CardContent>
        </Card>
    );
}
