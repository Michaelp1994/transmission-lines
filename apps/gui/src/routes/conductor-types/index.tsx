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

import { ConductorTypeTable } from "~/features/conductorTypes";

interface AllConductorTypesPageProps {}

export const AllConductorTypesPage: React.FC<
    AllConductorTypesPageProps
> = () => {
    const { t } = useTranslation("conductors");

    return (
        <Card>
            <CardHeader>
                <CardHeaderText>
                    <CardTitle>Conductor Types</CardTitle>
                    <CardDescription>
                        Conductor types in the database
                    </CardDescription>
                </CardHeaderText>
                <CardHeaderActions>
                    <Button asChild>
                        <Link to="/conductor-types/new">
                            {t("add.buttonText")}
                        </Link>
                    </Button>
                </CardHeaderActions>
            </CardHeader>
            <CardContent>
                <ConductorTypeTable />
            </CardContent>
        </Card>
    );
};

export const Route = createFileRoute("/conductor-types/")({
    component: AllConductorTypesPage,
    beforeLoad: () => ({
        text: "Conductor Types",
    }),
});
