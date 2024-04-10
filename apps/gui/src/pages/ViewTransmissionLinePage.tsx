import { styled } from "@linaria/react";
import { NavLink, Outlet } from "react-router-dom";
import { useTypedParams } from "react-router-typesafe-routes/dom";

import ModalRenderer from "../components/modals/modal-renderer";

import ROUTES from "@/router/routes";

const ViewTransmissionLinePage: React.FC = () => {
    const { projectId, lineId } = useTypedParams(
        ROUTES.UPDATE_TRANSMISSION_LINE
    );

    return (
        <Wrapper>
            <ModalRenderer />

            <Title>Transmission Line</Title>
            <Grid>
                <nav className="grid gap-4 text-sm text-muted-foreground">
                    <StyledLink
                        to={ROUTES.VIEW_TRANSMISSION_LINE.buildPath({
                            projectId,
                            lineId,
                        })}
                        end
                    >
                        General
                    </StyledLink>
                    <StyledLink
                        to={ROUTES.VIEW_TRANSMISSION_LINE.CONDUCTORS.buildPath({
                            projectId,
                            lineId,
                        })}
                    >
                        Conductors
                    </StyledLink>
                    <StyledLink
                        to={ROUTES.VIEW_TRANSMISSION_LINE.TOWERS.buildPath({
                            projectId,
                            lineId,
                        })}
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
    /* width: 100%; */
    /* max-width: 72rem; */
    grid-template-columns: 180px 1fr;
`;

export default ViewTransmissionLinePage;
