import { styled } from "@linaria/react";
import {
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
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import SourcesList from "@/features/sources/components/SourcesList";
import TransmissionLinesList from "@/features/transmissionLines/components/TransmissionLinesList";
import ROUTES from "@/router/routes";
import { List } from "@/components/List";
import trpc from "@/utils/trpc";

interface Props {}

const ProjectPage: React.FC<Props> = () => {
    const { t } = useTranslation("project");
    const saveProjectMutation = trpc.files.saveProject.useMutation();

    async function handleSave() {
        await saveProjectMutation.mutateAsync();
    }

    return (
        <StyledWrapper>
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
                                    <Button asChild>
                                        <Link to={ROUTES.CREATE_SOURCE.path}>
                                            {t("source:add.buttonText")}
                                        </Link>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{t("source:add.buttonTooltip")}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button asChild>
                                        <Link
                                            to={
                                                ROUTES.CREATE_TRANSMISSION_LINE
                                                    .path
                                            }
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
                    <List>
                        <SourcesList />
                        <TransmissionLinesList />
                    </List>
                </CardContent>
                <CardFooter>
                    <ButtonWrapper>
                        <Button asChild>
                            <Link to={ROUTES.GENERATE_RESULTS.path}>
                                {t("general:solve")}
                            </Link>
                        </Button>
                        <Button onClick={handleSave}>
                            {t("save.buttonText")}
                        </Button>
                    </ButtonWrapper>
                </CardFooter>
            </Card>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div``;
const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
`;

export default ProjectPage;
