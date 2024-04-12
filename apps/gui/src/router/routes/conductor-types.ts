import { route } from "react-router-typesafe-routes/dom";

import { conductorTypeId } from "./route-ids";

export default route(
    "conductor-types",
    {},
    {
        Create: route("new"),
        View: route(":conductorTypeId", {
            params: { conductorTypeId },
        }),
    }
);
