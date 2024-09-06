import { Button } from "@repo/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@repo/ui/tooltip";
import { Link, createFileRoute } from "@tanstack/react-router";
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
                <CardTitle>Sources</CardTitle>

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
            </CardHeader>
            <CardContent>
                <SourceTable projectId={projectId} />
            </CardContent>
        </Card>
    );
}
