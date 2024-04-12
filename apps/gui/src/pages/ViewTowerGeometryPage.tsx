import { styled } from "@linaria/react";
import { NavLink, Outlet } from "react-router-dom";
import { useTypedParams } from "react-router-typesafe-routes/dom";

import routes from "@/router/routes";

const ViewTowerGeometryPage: React.FC = () => {
    const { geometryId } = useTypedParams(routes.towerGeometries.View);

    return (
        <Wrapper>
            <Title>Tower Geometry</Title>
            <Grid>
                <nav className="grid gap-4 text-sm text-muted-foreground">
                    <StyledLink
                        to={routes.towerGeometries.View.buildPath({
                            geometryId,
                        })}
                        end
                    >
                        General
                    </StyledLink>
                    <StyledLink
                        to={routes.towerGeometries.View.Conductors.buildPath({
                            geometryId,
                        })}
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
};
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

export default ViewTowerGeometryPage;
