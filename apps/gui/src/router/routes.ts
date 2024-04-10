import { number, route, string } from "react-router-typesafe-routes/dom";

import {
    conductorTypeId,
    geometryId,
    lineId,
    projectId,
    sourceId,
    towerId,
} from "./route-ids";

const ROUTES = {
    HOME: route(""),
    WELCOME: route("welcome"),
    // Projects
    ALL_PROJECTS: route("projects"),
    CREATE_PROJECT: route("projects/new"),
    VIEW_PROJECT: route("projects/:projectId", {
        params: { projectId },
    }),
    UPDATE_PROJECT: route("projects/:projectId/update", {
        params: { projectId },
    }),
    // Transmission Lines
    CREATE_TRANSMISSION_LINE: route(
        "projects/:projectId/transmission-lines/new",
        {
            params: { projectId },
        }
    ),

    VIEW_TRANSMISSION_LINE: route(
        "projects/:projectId/transmission-lines/:lineId",
        {
            params: {
                projectId,
                lineId,
            },
        },
        {
            CONDUCTORS: route("conductors"),
            TOWERS: route("towers"),
        }
    ),

    UPDATE_TRANSMISSION_LINE: route(
        "projects/:projectId/transmission-lines/:lineId/update",
        {
            params: {
                projectId,
                lineId,
            },
        }
    ),

    // Transmission Line Parameters
    LINE_PARAMETERS: route(
        "projects/:projectId/transmission-lines/:lineId/towers/:towerId",
        {
            params: {
                lineId,
                towerId,
            },
        }
    ),
    // Sources
    CREATE_SOURCE: route("projects/:projectId/sources/new", {
        params: {
            projectId,
        },
    }),
    UPDATE_SOURCE: route("projects/:projectId/sources/:sourceId/update", {
        params: {
            projectId,
            sourceId,
        },
    }),

    // Tower Geometries
    ALL_TOWER_GEOMETRIES: route("tower-geometries"),
    CREATE_TOWER_GEOMETRY: route("tower-geometries/new"),
    UPDATE_TOWER_GEOMETRY: route("tower-geometries/:geometryId/update", {
        params: { geometryId },
    }),
    VIEW_TOWER_GEOMETRY: route(
        "tower-geometries/:geometryId",
        {
            params: {
                geometryId,
            },
        },
        {
            CONDUCTORS: route("conductors"),
        }
    ),
    // Conductor Types
    ALL_CONDUCTOR_TYPES: route("conductor-types"),
    CREATE_CONDUCTOR_TYPE: route("conductor-types/new"),
    UPDATE_CONDUCTOR_TYPE: route("conductors-types/:id/update", {
        params: { id: conductorTypeId },
    }),

    // Results
    GENERATE_RESULTS: route("projects/:projectId/results", {
        params: { projectId },
    }),

    TRANSMISSION_FAULT: route("fault/:lineId/:towerId", {
        params: { lineId: string().defined(), towerId: number().defined() },
    }),
} as const;

export default ROUTES;
