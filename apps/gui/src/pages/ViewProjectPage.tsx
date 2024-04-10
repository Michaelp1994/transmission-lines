import { styled } from "@linaria/react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardHeaderActions,
    CardHeaderText,
    CardTitle,
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@repo/ui";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useTypedParams } from "react-router-typesafe-routes/dom";

import { SourcesList } from "@/features/sources";
import SourceTable from "@/features/sources/components/SourceTable";
import { TransmissionLinesList } from "@/features/transmissionLines";
import TransmissionLineTable from "@/features/transmissionLines/components/TransmissionLinesTable";
import ROUTES from "@/router/routes";
import trpc from "@/utils/trpc";

interface Props {}

const ViewProjectPage: React.FC<Props> = () => {
    const { t } = useTranslation();
    const { projectId } = useTypedParams(ROUTES.VIEW_PROJECT);
    const exportProjectMutation = trpc.project.export.useMutation();
    const { data, isLoading, isError } = trpc.project.getById.useQuery({
        id: projectId,
    });
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <div>Error!...</div>;
    }

    async function exportProject() {
        await exportProjectMutation.mutateAsync({ id: projectId });
    }
    return (
        <Wrapper>
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
                                            to={ROUTES.CREATE_SOURCE.buildPath({
                                                projectId,
                                            })}
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
                                            to={ROUTES.CREATE_TRANSMISSION_LINE.buildPath(
                                                { projectId }
                                            )}
                                        >
                                            {t(
                                                "transmissionLine:add.buttonText"
                                            )}
                                        </Link>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>
                                        {t(
                                            "transmissionLine:add.buttonTooltip"
                                        )}
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </CardHeaderActions>
                </CardHeader>
                <CardContent>
                    <TransmissionLineTable projectId={projectId} />
                </CardContent>
            </Card>
            <Buttons>
                <Button asChild>
                    <Link
                        to={ROUTES.GENERATE_RESULTS.buildPath({
                            projectId,
                        })}
                    >
                        Solve
                    </Link>
                </Button>
                <Button onClick={() => exportProject()}>Export</Button>
            </Buttons>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const Buttons = styled.div`
    display: flex;
    gap: 1rem;
    justify-content: end;
`;
export default ViewProjectPage;
