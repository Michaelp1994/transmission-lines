import {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardHeaderActions,
    CardHeaderText,
    CardTitle,
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@repo/ui";
import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { useTranslation } from "react-i18next";

import { ConductorLocationTable } from "@/features/conductorLocations";

interface TowerGeometryConductorsProps {}

export const TowerGeometryConductors: React.FC<
    TowerGeometryConductorsProps
> = () => {
    const { geometryId } = Route.useParams();
    const { t } = useTranslation("towerGeomeryConductors");

    return (
        <ResizablePanelGroup
            direction="horizontal"
            className="max-w-md rounded-lg border"
        >
            <ResizablePanel defaultSize={50}>
                <Card>
                    <CardHeader>
                        <CardHeaderText>
                            <CardTitle>{t("title")}</CardTitle>
                            <CardDescription>
                                {t("description")}
                            </CardDescription>
                        </CardHeaderText>
                        <CardHeaderActions>
                            <Button>Add</Button>
                            <Button>Edit</Button>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button>{t("form:generate")}</Button>
                                    </TooltipTrigger>

                                    <TooltipContent>
                                        <p>{t("tooltip")}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </CardHeaderActions>
                    </CardHeader>
                    <CardContent>
                        <ConductorLocationTable geometryId={geometryId} />
                    </CardContent>
                </Card>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={50}>
                <Card>
                    <CardHeader>
                        <CardHeaderText>
                            <CardTitle>{t("title")}</CardTitle>
                            <CardDescription>
                                {t("description")}
                            </CardDescription>
                        </CardHeaderText>
                        <CardHeaderActions />
                    </CardHeader>
                    <CardContent>
                        {/* <TowerGeometryDiagram geometryId={geometryId} /> */}
                    </CardContent>
                </Card>
            </ResizablePanel>
        </ResizablePanelGroup>
    );
};

export const Route = createFileRoute(
    "/tower-geometries/$geometryId/_layout/conductors"
)({
    component: TowerGeometryConductors,
});
