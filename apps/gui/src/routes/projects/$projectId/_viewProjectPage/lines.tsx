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
import { useTranslation } from "react-i18next";
import { TransmissionLineTable } from "~/features/transmissionLines";

export const Route = createFileRoute(
    "/projects/$projectId/_viewProjectPage/lines"
)({
    component: ProjectSources,
});

export default function ProjectSources() {
    const { projectId } = Route.useParams();
    const { t } = useTranslation("transmissionLines");

    return (
        <Card>
            <CardHeader>
                <CardHeaderText>
                    <CardTitle>Transmission Lines</CardTitle>
                </CardHeaderText>
                <CardHeaderActions>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button asChild>
                                    <Link
                                        to="/projects/$projectId/lines/new"
                                        params={{ projectId }}
                                    >
                                        {t("add.buttonText")}
                                    </Link>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{t("add.buttonTooltip")}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </CardHeaderActions>
            </CardHeader>
            <CardContent>
                <TransmissionLineTable projectId={projectId} />
            </CardContent>
        </Card>
    );
}
