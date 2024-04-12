import { styled } from "@linaria/react";
import { Button, Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui";
import { useTranslation } from "react-i18next";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useTypedParams } from "react-router-typesafe-routes/dom";

import ProjectGeneral from "./ProjectGeneral";
import ProjectSources from "./ProjectSources";
import ProjectTransmissionLines from "./ProjectTransmissionLines";
import TransmissionLineGeneral from "./TransmissionLineGeneral";

import routes from "@/router/routes";
import trpc from "@/utils/trpc";

interface Props {}

const ViewProjectPage: React.FC<Props> = () => {
    const { projectId } = useTypedParams(routes.projects.View);
    const exportProjectMutation = trpc.project.export.useMutation();
    async function exportProject() {
        await exportProjectMutation.mutateAsync({ id: projectId });
    }
    return (
        <Wrapper>
            <Title>Project</Title>
            {/* <Tabs defaultValue="general" orientation="horizontal">
                <TabsList>
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="sources">Sources</TabsTrigger>
                    <TabsTrigger value="lines">Transmission Lines</TabsTrigger>
                </TabsList>
                <TabsContent value="general">
                    <ProjectGeneral />
                </TabsContent>
                <TabsContent value="sources">
                    <ProjectSources />
                </TabsContent>
                <TabsContent value="lines">
                    <ProjectTransmissionLines />
                </TabsContent>
            </Tabs> */}

            <Grid>
                <nav className="grid gap-4 text-sm text-muted-foreground">
                    <StyledLink
                        to={routes.projects.View.buildPath({
                            projectId,
                        })}
                        end
                    >
                        General
                    </StyledLink>
                    <StyledLink
                        to={routes.projects.View.Sources.buildPath({
                            projectId,
                        })}
                    >
                        Sources
                    </StyledLink>
                    <StyledLink
                        to={routes.projects.View.Lines.buildPath({
                            projectId,
                        })}
                    >
                        Transmission Lines
                    </StyledLink>
                </nav>
                <div className="grid gap-4">
                    <Outlet />
                </div>
            </Grid>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const Title = styled.h1`
    font-size: 1.875rem;
    line-height: 2.25rem;
    font-weight: 600;
    margin-bottom: 2rem;
`;

const StyledLink = styled(NavLink)`
    font-weight: 300;
    &.active {
        font-weight: 600;
    }
`;
const Grid = styled.div`
    display: grid;
    gap: 1.5rem;
    align-items: flex-start;
    grid-template-columns: 180px 1fr;
`;

export default ViewProjectPage;
