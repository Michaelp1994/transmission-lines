import { z } from "zod";
import { projectId, sourceId } from "../Ids.schema";

// create

export const createSourceSchema = z.object({
    name: z.string().min(2).max(50).trim(),
    phases: z
        .number({
            invalid_type_error: "Please enter a number",
        })
        .int({ message: "Please provide an integer value" })
        .min(0)
        .max(10),
    voltage: z.number().positive(),
    x1r1: z.number().min(0),
    x0r0: z.number().min(0),
    isc3: z.number().min(0),
    isc1: z.number().min(0),
    enabled: z.boolean(),
    resistance: z.number().positive(),
    frequency: z.number().positive(),
    projectId,
});

export type CreateSourceInput = z.infer<typeof createSourceSchema>;

// update positions

export const updateSourcePositionsSchema = z
    .object({
        id: sourceId,
        x: z.number(),
        y: z.number(),
    })
    .array();

export type UpdateSourcePositionsInput = z.infer<
    typeof updateSourcePositionsSchema
>;

// update general

export const updateSourceGeneralSchema = createSourceSchema
    .extend({
        id: sourceId,
    })
    .pick({
        id: true,
        name: true,
        enabled: true,
    });

export type UpdateSourceGeneralInput = z.infer<
    typeof updateSourceGeneralSchema
>;

// update electrical

export const updateSourceElectricalSchema = createSourceSchema
    .extend({
        id: sourceId,
    })
    .pick({
        id: true,
        phases: true,
        voltage: true,
        x1r1: true,
        x0r0: true,
        isc1: true,
        isc3: true,
        resistance: true,
        frequency: true,
    });

export type UpdateSourceElectricalInput = z.infer<
    typeof updateSourceElectricalSchema
>;

// getAllSources

export const getAllSourcesSchema = z.object({ projectId });

export type GetAllSourcesInput = z.infer<typeof getAllSourcesSchema>;

// getAllSourcesByProjectID

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
