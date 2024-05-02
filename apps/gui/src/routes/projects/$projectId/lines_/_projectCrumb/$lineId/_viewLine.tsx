import { styled } from "@linaria/react";
import { Link, Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
    "/projects/$projectId/lines/_projectCrumb/$lineId/_viewLine"
)({
    component: ViewTransmissionLinePage,
    beforeLoad: () => { return {
        text: "Transmission Line",
    } },
});

export default function ViewTransmissionLinePage() {
    const { projectId, lineId } = Route.useParams();

    return (
        <Wrapper>
            <Title>Transmission Line</Title>
            <Grid>
                <nav className="grid gap-4 text-sm text-muted-foreground">
                    <StyledLink
                        to="/projects/$projectId/lines/$lineId"
                        params={{ projectId, lineId }}
                        activeOptions={{ exact: true }}
                    >
                        General
                    </StyledLink>
                    <StyledLink
                        to="/projects/$projectId/lines/$lineId/conductors"
                        params={{ projectId, lineId }}
                    >
                        Conductors
                    </StyledLink>
                    <StyledLink
                        to="/projects/$projectId/lines/$lineId/towers"
                        params={{ projectId, lineId }}
                    >
                        Towers
                    </StyledLink>
                </nav>
                <div className="grid gap-4">
                    <Outlet />
                </div>
            </Grid>
        </Wrapper>
    );
}
const Wrapper = styled.div`
    margin-left: 2rem;
    margin-right: 2rem;
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
    /* width: 100%; */
    /* max-width: 72rem; */
    grid-template-columns: 180px 1fr;
`;
