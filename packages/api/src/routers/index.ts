import { router } from "../trpc";
import conductor from "./conductor";
import conductorLocations from "./conductorLocation";
import conductorType from "./conductorType";
import meta from "./meta";
import project from "./project";
import source from "./source";
import tower from "./tower";
import towerGeometry from "./towerGeometry";
import transmissionLine from "./transmissionLine";

export const appRouter = router({
    conductor,
    conductorType,
    conductorLocations,
    meta,
    project,
    source,
    tower,
    towerGeometry,
    transmissionLine,
});

export type AppRouter = typeof appRouter;
