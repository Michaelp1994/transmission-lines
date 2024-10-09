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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/tabs";
import { geometryId } from "@repo/validators/Ids";
import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { ConductorLocationTable } from "~/features/conductorLocations";
import { UpdateConductorTypeForm } from "~/features/conductorTypes";

export const Route = createFileRoute(
    "/libraries/_layout/conductor-types/$typeId/"
)({
    component: AllConductorTypesPage,
});

export default function AllConductorTypesPage() {
    const { t } = useTranslation("allConductorTypesPage");
    const { typeId } = Route.useParams();
    return (
        <Tabs defaultValue="general">
            <TabsList>
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="properties">Properties</TabsTrigger>
            </TabsList>
            <TabsContent value="general">
                <Card>
                    <CardHeader>
                        <CardTitle>{t("edit.title")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <UpdateConductorTypeForm conductorTypeId={typeId} />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="conductors">
                <CardWrapper>
                    <CardToolbar>
                        <Button>Add</Button>
                    </CardToolbar>
                    <Card>
                        <CardHeader>
                            <CardTitle>{t("title")}</CardTitle>
                            <CardDescription>
                                {t("description")}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ConductorLocationTable geometryId={geometryId} />
                        </CardContent>
                    </Card>
                </CardWrapper>
            </TabsContent>
        </Tabs>
    );
}
