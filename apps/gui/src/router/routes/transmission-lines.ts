import { route } from "react-router-typesafe-routes/dom";

import { lineId } from "./route-ids";

export default route(
    "lines",
    {},
    {
        Create: route("new"),
        View: route(
            ":lineId",
            {
                params: { lineId },
            },
            {
                Conductors: route("conductors"),
                Towers: route("towers"),
            }
        ),
    }
);
