import * as z from "zod";
import { createTransmissionLineSchema } from "./TransmissionLine.schema";
import { createSourceSchema } from "./Source.schema";

export const createProjectSchema = z.object({
    sources: createSourceSchema.array(),
    transmissionLines: createTransmissionLineSchema.array(),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;

export const defaultProject: CreateProjectInput = {
    sources: [],
    transmissionLines: [],
};
