import { route } from "react-router-typesafe-routes/dom";

import conductorTypes from "./conductor-types";
import projects from "./projects";
import towerGeometries from "./tower-geometries";

export default {
    home: route(""),
    conductorTypes,
    projects,
    towerGeometries,
};
