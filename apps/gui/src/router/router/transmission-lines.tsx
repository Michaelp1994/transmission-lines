import routes from "../routes";

import CreateTransmissionLinePage from "@/pages/CreateTransmissionLinePage";
import TransmissionLineConductors from "@/pages/TransmissionLineConductors";
import TransmissionLineGeneral from "@/pages/TransmissionLineGeneral";
import TransmissionLineTowers from "@/pages/TransmissionLineTowers";
import ViewTransmissionLinePage from "@/pages/ViewTransmissionLinePage";

const transmissionLinesRouter = [
    {
        path: routes.projects.View.Lines.Create.path,
        element: <CreateTransmissionLinePage />,
        handle: {
            crumb: (data) => ({
                link: routes.projects.View.Lines.Create.buildPath({
                    projectId: data.projectId,
                }),
                text: "Create Transmission Line",
            }),
        },
    },

    {
        path: routes.projects.View.Lines.View.path,
        element: <ViewTransmissionLinePage />,
        handle: {
            crumb: (data) => ({
                link: routes.projects.View.Lines.View.buildPath({
                    projectId: data.projectId,
                    lineId: data.lineId,
                }),
                text: "Transmission Line",
            }),
        },
        children: [
            {
                index: true,
                element: <TransmissionLineGeneral />,
            },
            {
                path: routes.projects.View.Lines.View.Conductors.path,
                element: <TransmissionLineConductors />,
            },
            {
                path: routes.projects.View.Lines.View.Towers.path,
                element: <TransmissionLineTowers />,
            },
        ],
    },
];

export default transmissionLinesRouter;
