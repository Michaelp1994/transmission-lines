import { styled } from "@linaria/react";
import { Link, Outlet, createFileRoute } from "@tanstack/react-router";

import trpc from "@/utils/trpc";

interface ViewProjectPageProps {}

export const ViewProjectPage: React.FC<ViewProjectPageProps> = () => {
    const { projectId } = Route.useParams();
    const exportProjectMutation = trpc.project.export.useMutation();
    async function exportProject() {
        await exportProjectMutation.mutateAsync({ id: projectId });
    }
    return (
        <Wrapper>
            <Title>Project</Title>

            <Grid>
                <nav className="grid gap-4 text-sm text-muted-foreground">
                    <StyledLink
                        activeOptions={{ exact: true }}
                        to="/projects/$projectId"
                        params={{ projectId }}
                    >
                        General
                    </StyledLink>
                    <StyledLink
                        to="/projects/$projectId/sources"
                        params={{ projectId }}
                    >
                        Sources
                    </StyledLink>
                    <StyledLink
                        to="/projects/$projectId/lines"
                        params={{ projectId }}
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

const StyledLink = styled(Link)`
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

export const Route = createFileRoute("/projects/$projectId/_viewProjectPage")({
    component: ViewProjectPage,
    beforeLoad: () => ({
        text: "View Project",
    }),
});
