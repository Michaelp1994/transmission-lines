import routes from "../routes";

import AllTowerGeometriesPage from "@/pages/AllTowerGeometriesPage";
import CreateTowerGeometryPage from "@/pages/CreateTowerGeometryPage";
import TowerGeometryConductors from "@/pages/TowerGeometryConductors";
import TowerGeometryGeneral from "@/pages/TowerGeometryGeneral";
import ViewTowerGeometryPage from "@/pages/ViewTowerGeometryPage";

const towerGeometryRouter = {
    path: routes.towerGeometries.path,
    handle: {
        crumb: () => ({
            link: routes.towerGeometries.path,
            text: "Tower Geometries",
        }),
    },
    children: [
        {
            index: true,
            element: <AllTowerGeometriesPage />,
        },
        {
            path: routes.towerGeometries.Create.path,
            element: <CreateTowerGeometryPage />,
            handle: {
                crumb: () => ({
                    link: routes.towerGeometries.Create.path,
                    text: "New Tower Geometry",
                }),
            },
        },
        {
            path: routes.towerGeometries.View.path,
            element: <ViewTowerGeometryPage />,
            handle: {
                crumb: () => ({
                    link: routes.towerGeometries.View.path,
                    text: "Tower Geometry",
                }),
            },
            children: [
                {
                    index: true,
                    element: <TowerGeometryGeneral />,
                },
                {
                    path: routes.towerGeometries.View.Conductors.path,
                    element: <TowerGeometryConductors />,
                },
            ],
        },
    ],
};

export default towerGeometryRouter;
