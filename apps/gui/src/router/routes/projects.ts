import { route } from "react-router-typesafe-routes/dom";

import sources from "./sources";
import transmissionLines from "./transmission-lines";
import { projectId } from "./route-ids";

export default route(
    "projects",
    {},
    {
        Create: route("new"),
        View: route(
            ":projectId",
            {
                params: { projectId },
            },
            {
                Sources: sources,
                Lines: transmissionLines,
            }
        ),
    }
);
