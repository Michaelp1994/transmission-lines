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
import { Link } from "react-router-dom";
import { useTypedParams } from "react-router-typesafe-routes/dom";

import { Modals } from "@/components/modals/config";
import useModal from "@/components/modals/use-modal";
import ConductorTable from "@/features/conductors/components/ConductorTable";
import { CreateConductorModalProps } from "@/features/conductors/components/CreateConductorModal/CreateConductorModal";
import { GenerateConductorsModalProps } from "@/features/conductors/components/GenerateConductorsModal/GenerateConductorsModal";
import { TransmissionLineTable } from "@/features/transmissionLines";
import routes from "@/router/routes";

interface Props {}

const ProjectTransmissionLines: React.FC<Props> = () => {
    const { projectId } = useTypedParams(routes.projects.View.Lines);
    const { t } = useTranslation("viewProject");
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
                                        to={routes.projects.View.Lines.Create.buildPath(
                                            { projectId }
                                        )}
                                    >
                                        {t("transmissionLine:add.buttonText")}
                                    </Link>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{t("transmissionLine:add.buttonTooltip")}</p>
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
};

export default ProjectTransmissionLines;
