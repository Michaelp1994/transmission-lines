import routes from "../routes";

import AllProjectsPage from "@/pages/AllProjectsPage";
import CreateProjectPage from "@/pages/CreateProjectPage";
import ProjectGeneral from "@/pages/ProjectGeneral";
import ProjectSources from "@/pages/ProjectSources";
import ProjectTransmissionLines from "@/pages/ProjectTransmissionLines";
import ViewProjectPage from "@/pages/ViewProjectPage";

const projectRoutes = {
    path: routes.projects.path,
    handle: {
        crumb: () => ({
            link: routes.projects.path,
            text: "Projects",
        }),
    },
    children: [
        {
            index: true,
            element: <AllProjectsPage />,
        },
        {
            path: routes.projects.Create.path,
            element: <CreateProjectPage />,
            handle: {
                crumb: () => ({
                    link: routes.projects.Create.path,
                    text: "New Project",
                }),
            },
        },
        {
            path: routes.projects.View.path,
            element: <ViewProjectPage />,
            handle: {
                crumb: (data) => ({
                    link: routes.projects.View.buildPath({
                        projectId: data.projectId,
                    }),
                    text: "Project",
                }),
            },
            children: [
                {
                    index: true,
                    element: <ProjectGeneral />,
                },
                {
                    path: routes.projects.View.Lines.path,
                    element: <ProjectTransmissionLines />,
                },

                {
                    path: routes.projects.View.Sources.path,
                    element: <ProjectSources />,
                },
            ],
        },
    ],
};

export default projectRoutes;
