import * as z from "zod";
import { transmissionLineSchema } from "./TransmissionLine.schema";
import { sourceSchema } from "./Source.schema";

export const projectSchema = z.object({
  sources: sourceSchema.array(),
  transmissionLines: transmissionLineSchema.array(),
});

export type ProjectInput = z.infer<typeof projectSchema>;

export const defaultProject: ProjectInput = {
  sources: [],
  transmissionLines: [],
};
