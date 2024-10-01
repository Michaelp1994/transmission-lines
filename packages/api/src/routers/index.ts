import { router } from "../trpc";
import conductorLocations from "./conductorLocation";
import conductorType from "./conductorType";
import meta from "./meta";
import project from "./project";

import towerGeometry from "./towerGeometry";

export const appRouter = router({
    conductorType,
    conductorLocations,
    meta,
    project,
    towerGeometry,
});

export type AppRouter = typeof appRouter;
