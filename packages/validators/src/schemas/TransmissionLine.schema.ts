import * as z from "zod";

import { lineId, projectId } from "./Ids.schema";

// create

export const createTransmissionLineSchema = z.object({
    name: z.string().min(2).max(50).trim(),
    fromSourceId: z.string().min(1, { message: "Please select a Source" }),
    toSourceId: z.string().nullable(),
    projectId,
});

export type CreateTransmissionLineInput = z.infer<
    typeof createTransmissionLineSchema
>;

export const defaultTransmissionLine: CreateTransmissionLineInput = {
    name: "",
    fromSourceId: "",
    toSourceId: "",
    projectId: "",
};

// update

export const updateTransmissionLineSchema = createTransmissionLineSchema.extend(
    {
        id: lineId,
    }
);

export type UpdateTransmissionLineInput = z.infer<
    typeof updateTransmissionLineSchema
>;

// getAllTransmissionLines

export const getAllTransmissionLinesSchema = z.object({
    projectId,
});

export type GetAllTransmissionLinesInput = z.infer<
    typeof getAllTransmissionLinesSchema
>;

// getAllTransmissionLines

export const getAllTransmissionLinesByProjectIdSchema = z.object({
    projectId,
});

export type GetAllTransmissionLinesByProjectIdInput = z.infer<
    typeof getAllTransmissionLinesByProjectIdSchema
>;

// getById

export const getTransmissionLineByIdSchema = z.object({
    id: lineId,
});

export type GetTransmissionLineByIdInput = z.infer<
    typeof getTransmissionLineByIdSchema
>;

// delete

export const deleteTransmissionLineSchema = z.object({ id: lineId });

export type DeleteTransmissionLineInput = z.infer<
    typeof deleteTransmissionLineSchema
>;

// getTransmissionLineParametersSchema
export const getTransmissionLineParametersSchema = z.object({ id: lineId });

export type GetTransmissionLineParametersInput = z.infer<
    typeof getTransmissionLineParametersSchema
>;
