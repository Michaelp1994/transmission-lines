import {
    Button,
    Card,
    CardContent,
    CardHeader,
    CardHeaderActions,
    CardHeaderText,
    CardTitle,
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@repo/ui";
import { Link, createFileRoute } from "@tanstack/react-router";
import React from "react";
import { useTranslation } from "react-i18next";

import { SourceTable } from "~/features/sources";

export const Route = createFileRoute(
    "/projects/$projectId/_viewProjectPage/sources"
)({
    component: ProjectSources,
});

export default function ProjectSources() {
    const { projectId } = Route.useParams();
    const { t } = useTranslation("viewProject");

    return (
        <Card>
            <CardHeader>
                <CardHeaderText>
                    <CardTitle>Sources</CardTitle>
                </CardHeaderText>
                <CardHeaderActions>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button asChild>
                                    <Link
                                        to="/projects/$projectId/sources/new"
                                        params={{ projectId }}
                                    >
                                        {t("source:add.buttonText")}
                                    </Link>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{t("source:add.buttonTooltip")}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </CardHeaderActions>
            </CardHeader>
            <CardContent>
                <SourceTable projectId={projectId} />
            </CardContent>
        </Card>
    );
}
