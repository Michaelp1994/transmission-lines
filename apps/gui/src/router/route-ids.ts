import {
    conductorTypeId as _conductorTypeId,
    geometryId as _geometryId,
    lineId as _lineId,
    projectId as _projectId,
    sourceId as _sourceId,
    towerId as _towerId,
} from "@repo/validators/schemas/Ids.schema";
import { zod } from "react-router-typesafe-routes/zod";

export const projectId = zod(_projectId).defined();
export const lineId = zod(_lineId).defined();
export const sourceId = zod(_sourceId).defined();
export const geometryId = zod(_geometryId).defined();
export const conductorTypeId = zod(_conductorTypeId).defined();
export const towerId = zod(_towerId).defined();
