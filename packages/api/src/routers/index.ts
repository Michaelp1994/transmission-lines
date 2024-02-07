import { router } from "../trpc";
import conductorType from "./conductorType";
import files from "./files";
import solution from "./solution";
import source from "./source";
import towerGeometry from "./towerGeometry";
import transmissionLine from "./transmissionLine";
import meta from "./meta";

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
