import conductorType from "./conductorType";
import files from "./files";
import meta from "./meta";
import solution from "./solution";
import source from "./source";
import towerGeometry from "./towerGeometry";
import transmissionLine from "./transmissionLine";
import { router } from "../trpc";

export const appRouter = router({
    conductorType,
    files,
    solution,
    source,
    towerGeometry,
    transmissionLine,
    meta,
});

export type AppRouter = typeof appRouter;
