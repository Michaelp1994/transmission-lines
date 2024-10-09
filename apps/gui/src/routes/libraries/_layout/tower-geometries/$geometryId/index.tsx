import NiceModal from "@ebay/nice-modal-react";
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
import { createFileRoute } from "@tanstack/react-router";
import { t } from "i18next";

import { ConductorLocationTable } from "~/features/conductorLocations";
import { UpdateTowerGeometryForm } from "~/features/towerGeometries";

export const Route = createFileRoute(
    "/libraries/_layout/tower-geometries/$geometryId/"
)({
    component: ViewTowerGeometryPage,
});

export default function ViewTowerGeometryPage() {
    const { geometryId } = Route.useParams();

    function showCreateModal() {
        NiceModal.show("create-conductor-location", {
            geometryId,
        });
    }
    return (
        <Tabs defaultValue="general">
            <TabsList>
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="conductors">Conductors</TabsTrigger>
            </TabsList>
            <TabsContent value="general">
                <Card>
                    <CardHeader>
                        <CardTitle>{t("edit.title")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <UpdateTowerGeometryForm geometryId={geometryId} />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="conductors">
                <CardWrapper>
                    <CardToolbar>
                        <Button onClick={showCreateModal}>Add</Button>
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
