import * as z from "zod";

export const sourceInputSchema = z.object({
    name: z.string().min(2).max(50).trim(),
    phases: z
        .number({
            invalid_type_error: "Please enter a number",
        })
        .int({ message: "Please provide an integer value" })
        .min(0)
        .max(10),
    voltage: z.number().min(1),
    x1r1: z.number().min(0),
    x0r0: z.number().min(0),
    isc3: z.number().min(0),
    isc1: z.number().min(0),
    resistance: z.number().gt(0),
    frequency: z.number().gt(0),
});

export const sourceSchema = sourceInputSchema.extend({
    id: z.string().uuid(),
});

export const updateSourceSchema = z.object({
    id: z.string().uuid(),
    source: sourceSchema,
});

export type Source = z.infer<typeof sourceSchema>;
export type SourceInput = z.infer<typeof sourceInputSchema>;

export const defaultSource: SourceInput = {
    name: "",
    phases: 3,
    voltage: 138,
    x1r1: 4,
    isc1: 4000,
    isc3: 3000,
    x0r0: 3,
    resistance: 15,
    frequency: 60,
};
