import { Link, RouteObject, createHashRouter } from "react-router-dom";

import ROUTES from "./routes";

import DefaultLayout from "@/layouts/DefaultLayout";
import AllConductorTypesPage from "@/pages/AllConductorTypesPage";
import AllProjectsPage from "@/pages/AllProjectsPage";
import AllTowerGeometriesPage from "@/pages/AllTowerGeometriesPage";
import CreateConductorTypePage from "@/pages/CreateConductorTypePage";
import CreateProjectPage from "@/pages/CreateProjectPage";
import CreateSourcePage from "@/pages/CreateSourcePage";
import CreateTowerGeometryPage from "@/pages/CreateTowerGeometryPage";
import CreateTransmissionLinePage from "@/pages/CreateTransmissionLinePage";
import ErrorPage from "@/pages/ErrorPage";
// import GeneratePage from "@/pages/GenerateResultsPage";
import LineParametersPage from "@/pages/LineParametersPage";
import PageNotFound from "@/pages/PageNotFound";
// import TransmissionLineFaultPage from "@/pages/TransmissionLineFaultPage";
import TransmissionLineConductors from "@/pages/TransmissionLineConductors";
import TransmissionLineGeneral from "@/pages/TransmissionLineGeneral";
import TransmissionLineTowers from "@/pages/TransmissionLineTowers";
import UpdateConductorTypePage from "@/pages/UpdateConductorTypePage";
import UpdateSourcePage from "@/pages/UpdateSourcePage";
import UpdateTowerGeometryPage from "@/pages/UpdateTowerGeometryPage";
import ViewProjectPage from "@/pages/ViewProjectPage";
// import ViewTransmissionLineParametersPage from "@/pages/ViewTransmissionLineParametersPage";
import ViewTransmissionLinePage from "@/pages/ViewTransmissionLinePage";

const routeObjects: RouteObject[] = [
    {
        // path: "/",
        element: <DefaultLayout />,
        errorElement: <ErrorPage />,
        handle: {
            crumb: () => ({
                link: ROUTES.HOME.path,
                text: "Home",
            }),
        },
        children: [
            {
                index: true,
                path: ROUTES.HOME.path,
                element: <AllProjectsPage />,
                handle: {
                    crumb: (data) => ({
                        link: ROUTES.HOME.path,
                        text: "All Projects",
                    }),
                },
            },
            {
                path: ROUTES.VIEW_PROJECT.path,
                handle: {
                    crumb: (data) => ({
                        link: ROUTES.VIEW_PROJECT.buildPath({
                            projectId: data.projectId,
                        }),
                        text: "Project",
                    }),
                },

                children: [
                    {
                        element: <ViewProjectPage />,
                        index: true,
                    },
                    {
                        path: ROUTES.CREATE_SOURCE.path,
                        element: <CreateSourcePage />,
                        handle: {
                            crumb: (data) => ({
                                link: ROUTES.CREATE_SOURCE.buildPath({
                                    projectId: data.projectId,
                                }),
                                text: "Create Source",
                            }),
                        },
                    },
                    {
                        path: ROUTES.UPDATE_SOURCE.path,
                        element: <UpdateSourcePage />,
                        handle: {
                            crumb: (data) => ({
                                link: ROUTES.UPDATE_SOURCE.buildPath({
                                    projectId: data.projectId,
                                    sourceId: data.sourceId,
                                }),
                                text: "Update Source",
                            }),
                        },
                    },
                    {
                        path: ROUTES.CREATE_TRANSMISSION_LINE.path,
                        element: <CreateTransmissionLinePage />,
                        handle: {
                            crumb: (data) => ({
                                link: ROUTES.CREATE_TRANSMISSION_LINE.buildPath(
                                    {
                                        projectId: data.projectId,
                                    }
                                ),
                                text: "Create Transmission Line",
                            }),
                        },
                    },

                    {
                        path: ROUTES.VIEW_TRANSMISSION_LINE.path,
                        element: <ViewTransmissionLinePage />,
                        handle: {
                            crumb: (data) => ({
                                link: ROUTES.VIEW_TRANSMISSION_LINE.buildPath({
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
                                path: ROUTES.VIEW_TRANSMISSION_LINE.CONDUCTORS
                                    .path,
                                element: <TransmissionLineConductors />,
                            },
                            {
                                path: ROUTES.VIEW_TRANSMISSION_LINE.TOWERS.path,
                                element: <TransmissionLineTowers />,
                            },
                        ],
                    },
                ],
            },
            {
                path: ROUTES.LINE_PARAMETERS.path,
                element: <LineParametersPage />,
                handle: {
                    crumb: (data) => ({
                        link: ROUTES.VIEW_TRANSMISSION_LINE.buildPath({
                            projectId: data.projectId,
                            lineId: data.lineId,
                        }),
                        text: "Line Parameters",
                    }),
                },
            },
            {
                path: ROUTES.CREATE_PROJECT.path,
                element: <CreateProjectPage />,
                handle: {
                    crumb: () => ({
                        link: ROUTES.CREATE_PROJECT.path,
                        text: "Create Project",
                    }),
                },
            },

            {
                path: ROUTES.CREATE_TOWER_GEOMETRY.path,
                element: <CreateTowerGeometryPage />,
            },
            {
                path: ROUTES.UPDATE_TOWER_GEOMETRY.path,
                element: <UpdateTowerGeometryPage />,
            },

            {
                path: ROUTES.CREATE_CONDUCTOR_TYPE.path,
                element: <CreateConductorTypePage />,
            },
            {
                path: ROUTES.UPDATE_CONDUCTOR_TYPE.path,
                element: <UpdateConductorTypePage />,
            },
            {
                path: ROUTES.ALL_TOWER_GEOMETRIES.path,
                element: <AllTowerGeometriesPage />,
            },
            {
                path: ROUTES.ALL_CONDUCTOR_TYPES.path,
                element: <AllConductorTypesPage />,
            },
            {
                path: "*",
                element: <PageNotFound />,
            },
        ],
    },
];

const router: ReturnType<typeof createHashRouter> =
    createHashRouter(routeObjects);

export default router;
