import { styled } from "@linaria/react";
import { Link, Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tower-geometries/$geometryId/_layout")({
    component: ViewTowerGeometryPage,
    beforeLoad: () => ({
        text: "View Tower Geometry",
    }),
});

export default function ViewTowerGeometryPage() {
    const { geometryId } = Route.useParams();

    return (
        <Wrapper>
            <Title>Tower Geometry</Title>
            <Grid>
                <nav className="grid gap-4 text-sm text-muted-foreground">
                    <StyledLink
                        to="/tower-geometries/$geometryId"
                        params={{ geometryId }}
                        activeOptions={{ exact: true }}
                    >
                        General
                    </StyledLink>
                    <StyledLink
                        to="/tower-geometries/$geometryId/conductors"
                        params={{ geometryId }}
                    >
                        Conductors
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
