import { styled } from "@linaria/react";
import React from "react";
import { useTypedParams } from "react-router-typesafe-routes/dom";

import routes from "@/router/routes";

interface Props {}

const LineParametersPage: React.FC<Props> = () => {
    const { projectId, lineId, towerId } = useTypedParams(
        routes.LINE_PARAMETERS
    );
    return (
        <Wrapper>
            <div>ProjectID: {projectId},</div>
            <div> lineID: {lineId}, </div>
            <div>towerID: {towerId}</div>
        </Wrapper>
    );
};

const Wrapper = styled.div``;
export default LineParametersPage;
