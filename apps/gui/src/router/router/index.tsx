import { RouteObject, createHashRouter } from "react-router-dom";

import conductorTypeRoutes from "./conductor-types";
import projectRoutes from "./projects";
import sourceRouter from "./sources";
import towerGeometryRoutes from "./tower-geometries";
import transmissionLinesRouter from "./transmission-lines";
import routes from "../routes";

import DefaultLayout from "@/layouts/DefaultLayout";
import ErrorPage from "@/pages/ErrorPage";
import HomePage from "@/pages/HomePage";
import PageNotFound from "@/pages/PageNotFound";

const routeObjects: RouteObject[] = [
    {
        element: <DefaultLayout />,
        errorElement: <ErrorPage />,
        handle: {
            crumb: () => ({
                link: routes.home.path,
                text: "Home",
            }),
        },
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            projectRoutes,
            conductorTypeRoutes,
            towerGeometryRoutes,
            ...sourceRouter,
            ...transmissionLinesRouter,
            {
                path: "*",
                element: <PageNotFound />,
            },
        ],
    },
];

const router = createHashRouter(routeObjects);

export default router;
