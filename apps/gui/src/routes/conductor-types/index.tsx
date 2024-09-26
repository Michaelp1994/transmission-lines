import { Button } from "@repo/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardToolbar,
    CardWrapper,
} from "@repo/ui/card";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ConductorTypeTable } from "~/features/conductorTypes";

export const Route = createFileRoute("/conductor-types/")({
    component: AllConductorTypesPage,
    beforeLoad: () => {
        return {
            text: "Conductor Types",
        };
    },
});

export default function AllConductorTypesPage() {
    const { t } = useTranslation("conductors");

    return (
        <CardWrapper>
            <CardToolbar>
                <Button asChild>
                    <Link to="/conductor-types/new">{t("add.buttonText")}</Link>
                </Button>
            </CardToolbar>
            <Card>
                <CardHeader>
                    <CardTitle>Conductor Types</CardTitle>
                    <CardDescription>
                        Conductor types in the database
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ConductorTypeTable />
                </CardContent>
            </Card>
        </CardWrapper>
    );
}
