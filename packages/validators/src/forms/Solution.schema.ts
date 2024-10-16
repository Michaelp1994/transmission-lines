import { z } from "zod";

import { towerId } from "../Ids.schema";

// create / update

export const solutionFormSchema = z.object({
    towerId: towerId,
});

export type SolutionFormInput = z.infer<typeof solutionFormSchema>;

export const defaultSolution: SolutionFormInput = {
    towerId: "",
};
