import routes from "../routes";

import AllConductorTypesPage from "@/pages/AllConductorTypesPage";
import CreateConductorTypePage from "@/pages/CreateConductorTypePage";
import UpdateConductorTypePage from "@/pages/UpdateConductorTypePage";

const conductorTypeRoutes = {
    path: routes.conductorTypes.path,
    handle: {
        crumb: () => ({
            link: routes.conductorTypes.path,
            text: "Conductor Types",
        }),
    },
    children: [
        {
            index: true,
            element: <AllConductorTypesPage />,
        },
        {
            path: routes.conductorTypes.Create.path,
            element: <CreateConductorTypePage />,
            handle: {
                crumb: () => ({
                    link: routes.conductorTypes.Create.path,
                    text: "New Conductor Type",
                }),
            },
        },
        {
            path: routes.conductorTypes.View.path,
            element: <UpdateConductorTypePage />,
            handle: {
                crumb: (data) => ({
                    link: routes.conductorTypes.View.buildPath({
                        conductorTypeId: data.conductorTypeId,
                    }),
                    text: "Update Conductor Type",
                }),
            },
        },
    ],
};

export default conductorTypeRoutes;
