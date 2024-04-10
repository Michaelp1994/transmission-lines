import conductorRouter from "./conductor";
import conductorLocationRouter from "./conductorLocation";
import conductorTypeRouter from "./conductorType";
import metaRouter from "./meta";
import projectRouter from "./project";
import sourceRouter from "./source";
import towerRouter from "./tower";
import towerGeometryRouter from "./towerGeometry";
import transmissionLineRouter from "./transmissionLine";
import { router } from "../trpc";

export const appRouter = router({
    conductor: conductorRouter,
    conductorType: conductorTypeRouter,
    conductorLocations: conductorLocationRouter,
    meta: metaRouter,
    project: projectRouter,
    source: sourceRouter,
    tower: towerRouter,
    towerGeometry: towerGeometryRouter,
    transmissionLine: transmissionLineRouter,
});

export type AppRouter = typeof appRouter;
