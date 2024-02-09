import { createHashRouter, RouteObject } from "react-router-dom";
import ROUTES from "./routes";

import DefaultLayout from "@/layouts/DefaultLayout";

import Home from "@/pages/HomePage";
import PageNotFound from "@/pages/PageNotFound";
import WelcomePage from "@/pages/WelcomePage";
import ErrorPage from "@/pages/ErrorPage";
import ProjectPage from "@/pages/ProjectPage";

// Conductor Types
import CreateConductorTypePage from "@/pages/CreateConductorTypePage";
import UpdateConductorTypePage from "@/pages/UpdateConductorTypePage";
import AllConductorTypesPage from "@/pages/AllConductorTypesPage";

// Transmission Lines
import CreateTransmissionLinePage from "@/pages/CreateTransmissionLinePage";
import UpdateTransmissionLinePage from "@/pages/UpdateTransmissionLinePage";

// Tower Geometries
import AllTowerGeometriesPage from "@/pages/AllTowerGeometriesPage";
import CreateTowerGeometryPage from "@/pages/CreateTowerGeometryPage";
import UpdateTowerGeometryPage from "@/pages/UpdateTowerGeometryPage";

// Sources
import CreateSourcePage from "@/pages/CreateSourcePage";
import UpdateSourcePage from "@/pages/UpdateSourcePage";

// Results
import TransmissionLineFaultPage from "@/pages/TransmissionLineFaultPage";
import BuildTransmissionLinePage from "@/pages/BuildTransmissionLinePage";
import GeneratePage from "@/pages/GenerateResultsPage";

const routeObjects: RouteObject[] = [
    {
        path: "/",
        element: <DefaultLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                path: ROUTES.HOME.path,
                element: <Home />,
            },
            {
                path: ROUTES.WELCOME.path,
                element: <WelcomePage />,
            },
            {
                path: ROUTES.PROJECT.path,
                element: <ProjectPage />,
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
            {
                path: ROUTES.TRANSMISSION_FAULT.path,
                element: <TransmissionLineFaultPage />,
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
                path: ROUTES.GENERATE_RESULTS.path,
                element: <GeneratePage />,
            },
            {
                path: ROUTES.BUILD_TRANSMISSION_LINE.path,
                element: <BuildTransmissionLinePage />,
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
