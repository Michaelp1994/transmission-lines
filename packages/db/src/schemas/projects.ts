import type { Solution } from "./solution";

import { type Source } from "./sources";
import { type TransmissionLine } from "./transmissionLines";

export interface Project {
    id: string;
    name: string;
    sources: Source[];
    transmissionLines: TransmissionLine[];
    solution: Solution;
}
