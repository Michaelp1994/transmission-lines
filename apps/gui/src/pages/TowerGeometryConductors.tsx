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
import React from "react";
import { useTranslation } from "react-i18next";
import { useTypedParams } from "react-router-typesafe-routes/dom";

import { ConductorLocationTable } from "@/features/conductorLocations";
import { TowerGeometryDiagram } from "@/features/towerGeometries";
import ROUTES from "@/router/routes";

interface Props {}

const TowerGeometryConductors: React.FC<Props> = () => {
    const { geometryId } = useTypedParams(
        ROUTES.VIEW_TOWER_GEOMETRY.CONDUCTORS
    );
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
                            <Button onClick>Edit</Button>
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

export default TowerGeometryConductors;
