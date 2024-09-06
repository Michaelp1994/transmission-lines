import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@repo/ui/card";
import { Button } from "@repo/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@repo/ui/tooltip";
import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { TowerTable } from "~/features/towers";
import { useCreateTowerModal, useGenerateTowersModal } from "~/utils/modals";

export const Route = createFileRoute(
    "/projects/$projectId/lines/_projectCrumb/$lineId/_viewLine/towers"
)({
    component: TransmissionLineTowers,
});

export default function TransmissionLineTowers() {
    const { lineId } = Route.useParams();
    const { t } = useTranslation("towerConfiguration");
    const displayCreateModal = useCreateTowerModal(lineId);
    const displayGenerateModal = useGenerateTowersModal(lineId);

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t("title")}</CardTitle>
                <CardDescription>{t("description")}</CardDescription>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button onClick={displayCreateModal}>Add</Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Add a Tower to the Line</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button onClick={displayGenerateModal}>
                                {t("form:generate")}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Generate tower configuration</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </CardHeader>
            <CardContent>
                <TowerTable lineId={lineId} />
            </CardContent>
        </Card>
    );
}
