import { z } from "zod";

import { towerId } from "../Ids.schema";

export const solveSolutionSchema = z.object({
    towerId,
});
