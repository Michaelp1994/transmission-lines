import { styled } from "@linaria/react";
import { Link, Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/conductor-types/$typeId/_layout")({
    component: ViewConductorTypePage,
    beforeLoad: () => {
        return {
            text: "View Conductor Type",
        };
    },
});

export default function ViewConductorTypePage() {
    const { typeId } = Route.useParams();

    return (
        <Wrapper>
            <Title>Conductor Type</Title>
            <Grid>
                <nav className="grid gap-4 text-sm text-muted-foreground">
                    <StyledLink
                        to="/conductor-types/$typeId"
                        params={{ typeId }}
                        activeOptions={{ exact: true }}
                    >
                        General
                    </StyledLink>
                    <StyledLink
                        to="/conductor-types/$typeId/properties"
                        params={{ typeId }}
                    >
                        Properties
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
    grid-template-columns: 180px 1fr;
`;
