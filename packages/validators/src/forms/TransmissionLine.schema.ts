import { z } from "zod";

import { sourceId } from "@/Ids.schema";

// create / update

export const transmissionLineFormSchema = z.object({
    name: z.string().min(2).max(50).trim(),
    fromSourceId: sourceId,
    toSourceId: sourceId.nullable(),
});

export type TransmissionLineFormInput = z.infer<
    typeof transmissionLineFormSchema
>;

export const defaultTransmissionLine: TransmissionLineFormInput = {
    name: "",
    fromSourceId: "",
    toSourceId: "",
};