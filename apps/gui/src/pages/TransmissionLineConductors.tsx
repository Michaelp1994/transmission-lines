import {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardHeaderActions,
    CardHeaderText,
    CardTitle,
    DialogTrigger,
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@repo/ui";
import React from "react";
import { useTranslation } from "react-i18next";
import { useTypedParams } from "react-router-typesafe-routes/dom";

import { Modals } from "@/components/modals/config";
import useModal from "@/components/modals/use-modal";
import ConductorTable from "@/features/conductors/components/ConductorTable";
import { CreateConductorModalProps } from "@/features/conductors/components/CreateConductorModal/CreateConductorModal";
import { GenerateConductorsModalProps } from "@/features/conductors/components/GenerateConductorsModal/GenerateConductorsModal";
import ROUTES from "@/router/routes";

interface Props {}

const TransmissionLineConductors: React.FC<Props> = () => {
    const { projectId, lineId } = useTypedParams(
        ROUTES.VIEW_TRANSMISSION_LINE.CONDUCTORS
    );
    const { t } = useTranslation("transmissionLineConductors");
    const createModal = useModal<CreateConductorModalProps>(
        Modals.CreateConductorModal
    );
    const generateModal = useModal<GenerateConductorsModalProps>(
        Modals.GenerateConductorsModal
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
};

export default TransmissionLineConductors;
