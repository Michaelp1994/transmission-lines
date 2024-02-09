import { number, route, string } from "react-router-typesafe-routes/dom";

const ROUTES = {
    HOME: route(""),
    WELCOME: route("welcome"),
    PROJECT: route("project"),
    // Tower Geometries
    ALL_TOWER_GEOMETRIES: route("tower-geometries"),
    CREATE_TOWER_GEOMETRY: route("tower-geometries/new"),
    UPDATE_TOWER_GEOMETRY: route("tower-geometries/:id/update", {
        params: { id: number().defined() },
    }),
    // Conductor Types
    ALL_CONDUCTOR_TYPES: route("conductor-types"),
    CREATE_CONDUCTOR_TYPE: route("conductor-types/new"),
    UPDATE_CONDUCTOR_TYPE: route("conductors/:id/update", {
        params: { id: number().defined() },
    }),
    // Transmission Lines
    CREATE_TRANSMISSION_LINE: route("transmission-lines/new"),
    UPDATE_TRANSMISSION_LINE: route("transmission-lines/:id/update", {
        params: { id: string().defined() },
    }),
    // Sources
    CREATE_SOURCE: route("sources/new"),
    UPDATE_SOURCE: route("sources/:id/update", {
        params: { id: string().defined() },
    }),
    // Results
    GENERATE_RESULTS: route("generate-results"),
    BUILD_TRANSMISSION_LINE: route("build-transmission-line/:id", {
        params: { id: string().defined() },
    }),
    TRANSMISSION_FAULT: route("fault/:lineId/:towerId", {
        params: { lineId: string().defined(), towerId: number().defined() },
    }),
} as const;

export default ROUTES;
