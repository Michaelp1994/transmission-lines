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
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useTypedParams } from "react-router-typesafe-routes/dom";

import { Modals } from "@/components/modals/config";
import useModal from "@/components/modals/use-modal";
import { CreateTowerModalProps } from "@/features/towers/components/CreateTowerModal/CreateTowerModal";
import { GenerateTowersModalProps } from "@/features/towers/components/GenerateTowersModal/GenerateTowersModal";
import TowerTable from "@/features/towers/components/TowerTable";
import ROUTES from "@/router/routes";

interface Props {}

const TransmissionLineTowers: React.FC<Props> = () => {
    const { lineId } = useTypedParams(ROUTES.VIEW_TRANSMISSION_LINE.TOWERS);
    const createModal = useModal<CreateTowerModalProps>(
        Modals.CreateTowerModal
    );
    const generateModal = useModal<GenerateTowersModalProps>(
        Modals.GenerateTowersModal
    );

    const displayCreateModal = () => {
        createModal.open({
            lineId,
            onClose: createModal.close,
        });
    };
    const displayGenerateModal = () => {
        generateModal.open({
            lineId,
            onClose: generateModal.close,
        });
    };
    const { t } = useTranslation("towerConfiguration");
    return (
        <Card>
            <CardHeader>
                <CardHeaderText>
                    <CardTitle>{t("title")}</CardTitle>
                    <CardDescription>{t("description")}</CardDescription>
                </CardHeaderText>
                <CardHeaderActions>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button onClick={displayCreateModal}>
                                    Add
                                </Button>
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
                </CardHeaderActions>
            </CardHeader>
            <CardContent>
                <TowerTable lineId={lineId} />
            </CardContent>
        </Card>
    );
};

export default TransmissionLineTowers;
