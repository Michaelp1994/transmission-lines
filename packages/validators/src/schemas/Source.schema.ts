import * as z from "zod";

import { projectId, sourceId } from "./Ids.schema";

// create

export const createSourceSchema = z.object({
    name: z.string().min(2).max(50).trim(),
    phases: z.coerce
        .number({
            invalid_type_error: "Please enter a number",
        })
        .int({ message: "Please provide an integer value" })
        .min(0)
        .max(10),
    voltage: z.coerce.number().positive(),
    x1r1: z.coerce.number().min(0),
    x0r0: z.coerce.number().min(0),
    isc3: z.coerce.number().min(0),
    isc1: z.coerce.number().min(0),
    resistance: z.coerce.number().positive(),
    frequency: z.coerce.number().positive(),
    projectId,
});

export type CreateSourceInput = z.infer<typeof createSourceSchema>;

export const defaultSource: CreateSourceInput = {
    name: "",
    phases: 3,
    voltage: 138,
    x1r1: 4,
    isc1: 4000,
    isc3: 3000,
    x0r0: 3,
    resistance: 15,
    frequency: 60,
    projectId: "",
};

// update

export const updateSourceSchema = createSourceSchema.extend({
    id: sourceId,
});

export type UpdateSourceInput = z.infer<typeof updateSourceSchema>;

// getAllSources

export const getAllSourcesSchema = z.object({ projectId });

export type GetAllSourcesInput = z.infer<typeof getAllSourcesSchema>;

// getAllSources

export const getAllSourcesByProjectIdSchema = z.object({ projectId });

export type GetAllSourcesByProjectIdInput = z.infer<
    typeof getAllSourcesByProjectIdSchema
>;

// getById

export const getSourceByIdSchema = z.object({ id: sourceId });

export type GetSourceByIdInput = z.infer<typeof getSourceByIdSchema>;

// delete

export const deleteSourceSchema = z.object({ id: sourceId });

export type DeleteSourceInput = z.infer<typeof deleteSourceSchema>;
