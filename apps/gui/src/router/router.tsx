import { RouteObject, createHashRouter } from "react-router-dom";

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
import PageNotFound from "@/pages/PageNotFound";
// import TransmissionLineFaultPage from "@/pages/TransmissionLineFaultPage";
import UpdateConductorTypePage from "@/pages/UpdateConductorTypePage";
import UpdateSourcePage from "@/pages/UpdateSourcePage";
import UpdateTowerGeometryPage from "@/pages/UpdateTowerGeometryPage";
import UpdateTransmissionLinePage from "@/pages/UpdateTransmissionLinePage";
import ViewProjectPage from "@/pages/ViewProjectPage";
// import ViewTransmissionLineParametersPage from "@/pages/ViewTransmissionLineParametersPage";
import WelcomePage from "@/pages/WelcomePage";

const routeObjects: RouteObject[] = [
    {
        path: "/",
        element: <DefaultLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                path: ROUTES.HOME.path,
                element: <AllProjectsPage />,
            },
            {
                path: ROUTES.WELCOME.path,
                element: <WelcomePage />,
            },
            {
                path: ROUTES.VIEW_PROJECT.path,
                element: <ViewProjectPage />,
            },
            {
                path: ROUTES.CREATE_PROJECT.path,
                element: <CreateProjectPage />,
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
                path: ROUTES.CREATE_TRANSMISSION_LINE.path,
                element: <CreateTransmissionLinePage />,
            },
            {
                path: ROUTES.UPDATE_TRANSMISSION_LINE.path,
                element: <UpdateTransmissionLinePage />,
            },
            {
                path: ROUTES.CREATE_SOURCE.path,
                element: <CreateSourcePage />,
            },
            {
                path: ROUTES.UPDATE_SOURCE.path,
                element: <UpdateSourcePage />,
            },
            {
                path: ROUTES.CREATE_CONDUCTOR_TYPE.path,
                element: <CreateConductorTypePage />,
            },
            // {
            //     path: ROUTES.TRANSMISSION_FAULT.path,
            //     element: <TransmissionLineFaultPage />,
            // },

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
            // {
            //     path: ROUTES.GENERATE_RESULTS.path,
            //     element: <GeneratePage />,
            // },
            // {
            //     path: ROUTES.VIEW_TRANSMISSION_LINE_PARAMETERS.path,
            //     element: <ViewTransmissionLineParametersPage />,
            // },
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
