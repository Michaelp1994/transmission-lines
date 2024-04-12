import { route } from "react-router-typesafe-routes/dom";

import { sourceId } from "./route-ids";

export default route(
    "sources",
    {},
    {
        Create: route("new"),
        View: route(":sourceId", {
            params: { sourceId },
        }),
    }
);
