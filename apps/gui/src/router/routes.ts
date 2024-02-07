import { route, number, string } from "react-router-typesafe-routes/dom";

const ROUTES = {
    HOME: route(""),
    WELCOME: route("welcome"),
    PROJECT: route("project"),
    TOWER_GEOMETRIES: route("tower-geometries"),
    CONDUCTORS: route("conductors"),
    GENERATE_RESULTS: route("generate-results"),
    CREATE_TRANSMISSION_LINE: route("transmission-lines/new"),
    CREATE_SOURCE: route("sources/new"),
    CREATE_CONDUCTOR: route("conductors/new"),
    CREATE_TOWER_GEOMETRY: route("tower-geometries/new"),
    BUILD_TRANSMISSION_LINE: route("build-transmission-line/:id", {
        params: { id: string().defined() },
    }),
    TRANSMISSION_FAULT: route("fault/:lineId/:towerId", {
        params: { lineId: string().defined(), towerId: number().defined() },
    }),
    UPDATE_TRANSMISSION_LINE: route("transmission-lines/:id/update", {
        params: { id: string().defined() },
    }),
    UPDATE_SOURCE: route("sources/:id/update", {
        params: { id: string().defined() },
    }),
    UPDATE_CONDUCTOR_TYPE: route("conductors/:id/update", {
        params: { id: number().defined() },
    }),
    UPDATE_TOWER_GEOMETRY: route("tower-geometries/:id/update", {
        params: { id: number().defined() },
    }),
} as const;

export default ROUTES;
