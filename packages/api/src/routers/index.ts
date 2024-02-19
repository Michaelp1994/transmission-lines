import conductorTypeRouter from "./conductorType";
import metaRouter from "./meta";
import projectRouter from "./project";
// import solutionRouter from "./solution";
import sourceRouter from "./source";
import towerGeometryRouter from "./towerGeometry";
import transmissionLineRouter from "./transmissionLine";
import { router } from "../trpc";

export const appRouter = router({
    conductorType: conductorTypeRouter,
    // solution: solutionRouter,
    source: sourceRouter,
    towerGeometry: towerGeometryRouter,
    transmissionLine: transmissionLineRouter,
    meta: metaRouter,
    project: projectRouter,
});

export type AppRouter = typeof appRouter;
