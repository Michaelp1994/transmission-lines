import {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardHeaderActions,
    CardHeaderText,
    CardTitle,
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@repo/ui";
import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ConductorTable } from "~/features/conductors";
import {
    useCreateConductorModal,
    useGenerateConductorsModal,
} from "~/utils/modals";

export const Route = createFileRoute(
    "/projects/$projectId/lines/_projectCrumb/$lineId/_viewLine/conductors"
)({
    component: TransmissionLineConductors,
});

export default function TransmissionLineConductors() {
    const { lineId } = Route.useParams();
    const { t } = useTranslation("transmissionLineConductors");
    const displayCreateModal = useCreateConductorModal(lineId);
    const displayGenerateModal = useGenerateConductorsModal(lineId);

    return (
        <Card>
            <CardHeader>
                <CardHeaderText>
                    <CardTitle>{t("title")}</CardTitle>
                    <CardDescription>{t("description")}</CardDescription>
                </CardHeaderText>
                <CardHeaderActions>
                    <Button onClick={displayCreateModal}>Add</Button>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button onClick={displayGenerateModal}>
                                    {t("form:generate")}
                                </Button>
                            </TooltipTrigger>

                            <TooltipContent>
                                <p>{t("tooltip")}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </CardHeaderActions>
            </CardHeader>
            <CardContent>
                <ConductorTable lineId={lineId} />
            </CardContent>
        </Card>
    );
}
