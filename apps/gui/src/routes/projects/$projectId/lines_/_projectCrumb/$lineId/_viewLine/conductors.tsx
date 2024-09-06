import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@repo/ui/card";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@repo/ui/tooltip";
import { Button } from "@repo/ui/button";
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
                <CardTitle>{t("title")}</CardTitle>
                <CardDescription>{t("description")}</CardDescription>
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
            </CardHeader>
            <CardContent>
                <ConductorTable lineId={lineId} />
            </CardContent>
        </Card>
    );
}
