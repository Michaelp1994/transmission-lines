import { styled } from "@linaria/react";
import { createFileRoute } from "@tanstack/react-router";
import React from "react";

interface LineParametersPageProps {}

export const LineParametersPage: React.FC<LineParametersPageProps> = () => {
    const { projectId, lineId, towerId } = Route.useParams();
    return (
        <Wrapper>
            <div>ProjectID: {projectId},</div>
            <div> lineID: {lineId}, </div>
            <div>towerID: {towerId}</div>
        </Wrapper>
    );
};

const Wrapper = styled.div``;

export const Route = createFileRoute(
    "/projects/$projectId/lines/_projectCrumb/$lineId/$towerId/"
)({
    component: LineParametersPage,
    beforeLoad: () => ({
        text: "LineParametersPage",
    }),
});
