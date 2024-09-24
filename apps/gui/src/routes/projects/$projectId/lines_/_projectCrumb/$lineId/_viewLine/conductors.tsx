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
import NiceModal from "@ebay/nice-modal-react";

export const Route = createFileRoute(
    "/projects/$projectId/lines/_projectCrumb/$lineId/_viewLine/conductors"
)({
    component: TransmissionLineConductors,
});

export default function TransmissionLineConductors() {
    const { lineId } = Route.useParams();
    const { t } = useTranslation("transmissionLineConductors");
    function showCreateModal() {
        NiceModal.show("create-conductor", {
            lineId,
        });
    }

    function showGenerateModal() {
        NiceModal.show("generate-conductors", { lineId });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t("title")}</CardTitle>
                <CardDescription>{t("description")}</CardDescription>
                <Button onClick={showCreateModal}>Add</Button>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button onClick={showGenerateModal}>
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
