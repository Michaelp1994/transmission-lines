import { router } from "../trpc";
import conductorType from "./conductorType";
import files from "./files";
import solution from "./solution";
import source from "./source";
import towerGeometry from "./towerGeometry";
import transmissionLine from "./transmissionLine";

export const appRouter = router({
    conductorType,
    files,
    solution,
    source,
    towerGeometry,
    transmissionLine,
});

export type AppRouter = typeof appRouter;
