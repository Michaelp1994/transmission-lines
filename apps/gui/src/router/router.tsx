import { createHashRouter, RouteObject } from "react-router-dom";
import ROUTES from "./routes";

import DefaultLayout from "@/layouts/DefaultLayout";
import Home from "@/pages/Home";
import CreateTransmissionLine from "@/pages/CreateTransmissionLine";
import GeneratePage from "@/pages/GenerateResults";
import TowerGeometries from "@/pages/TowerGeometries";
import Conductors from "@/pages/Conductors";
import UpdateTransmissionLine from "@/pages/UpdateTransmissionLine";
import UpdateSource from "@/pages/UpdateSource";
import PageNotFound from "@/pages/PageNotFound";
import CreateSource from "@/pages/CreateSource";
import WelcomePage from "@/pages/WelcomePage";
import CreateConductorType from "@/pages/CreateConductorType";
import CreateTowerGeometry from "@/pages/CreateTowerGeometry";
import UpdateConductorType from "@/pages/UpdateConductorType";
import UpdateTowerGeometry from "@/pages/UpdateTowerGeometry";
import ErrorPage from "@/pages/ErrorPage";
import ProjectPage from "@/pages/ProjectPage";
import BuildTransmissionLine from "@/pages/BuildTransmissionLine";
import TransmissionLineFault from "@/pages/TransmissionLineFault";
import TowerConfigurationTable from "@/features/transmissionLines/components/TowerConfigurationTable";
import TransmissionLineInfo from "@/features/transmissionLines/components/TransmissionLineInfo";

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
                element: <CreateTowerGeometry />,
            },
            {
                path: ROUTES.CREATE_TRANSMISSION_LINE.path,
                element: <CreateTransmissionLine />,
            },
            {
                path: ROUTES.CREATE_SOURCE.path,
                element: <CreateSource />,
            },
            {
                path: ROUTES.CREATE_CONDUCTOR.path,
                element: <CreateConductorType />,
            },
            {
                path: ROUTES.TRANSMISSION_FAULT.path,
                element: <TransmissionLineFault />,
            },
            {
                path: ROUTES.UPDATE_TRANSMISSION_LINE.path,
                element: <UpdateTransmissionLine />,
            },
            {
                path: ROUTES.UPDATE_TOWER_GEOMETRY.path,
                element: <UpdateTowerGeometry />,
            },
            {
                path: ROUTES.UPDATE_SOURCE.path,
                element: <UpdateSource />,
            },
            {
                path: ROUTES.UPDATE_CONDUCTOR_TYPE.path,
                element: <UpdateConductorType />,
            },
            {
                path: ROUTES.TOWER_GEOMETRIES.path,
                element: <TowerGeometries />,
            },
            {
                path: ROUTES.CONDUCTORS.path,
                element: <Conductors />,
            },
            {
                path: ROUTES.GENERATE_RESULTS.path,
                element: <GeneratePage />,
            },
            {
                path: ROUTES.BUILD_TRANSMISSION_LINE.path,
                element: <BuildTransmissionLine />,
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
