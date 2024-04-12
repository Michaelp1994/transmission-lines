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
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useTypedParams } from "react-router-typesafe-routes/dom";

import SourceTable from "@/features/sources/components/SourceTable";
import routes from "@/router/routes";

interface Props {}

const ProjectSources: React.FC<Props> = () => {
    const { projectId } = useTypedParams(routes.projects.View.Sources);
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
                                        to={routes.projects.View.Sources.Create.buildPath(
                                            {
                                                projectId,
                                            }
                                        )}
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
};

export default ProjectSources;
