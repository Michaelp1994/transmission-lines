import { route } from "react-router-typesafe-routes/dom";

import { geometryId } from "./route-ids";

export default route(
    "tower-geometries",
    {},
    {
        Create: route("new"),
        View: route(
            ":geometryId",
            {
                params: {
                    geometryId,
                },
            },
            {
                Conductors: route("conductors"),
            }
        ),
    }
);
