import routes from "../routes";

import CreateSourcePage from "@/pages/CreateSourcePage";
import ViewSourcePage from "@/pages/ViewSourcePage";

const sourceRouter = [
    {
        path: routes.projects.View.Sources.Create.path,
        element: <CreateSourcePage />,
        handle: {
            crumb: (data) => ({
                link: routes.projects.View.Sources.Create.buildPath({
                    projectId: data.projectId,
                }),
                text: "Create Source",
            }),
        },
    },
    {
        path: routes.projects.View.Sources.View.path,
        element: <ViewSourcePage />,
        handle: {
            crumb: (data) => ({
                link: routes.projects.View.Sources.View.buildPath({
                    projectId: data.projectId,
                    sourceId: data.sourceId,
                }),
                text: "Source",
            }),
        },
    },
];

export default sourceRouter;
