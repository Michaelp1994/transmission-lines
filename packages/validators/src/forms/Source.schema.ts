import { z } from "zod";

// create / update

export const sourceFormSchema = z.object({
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
    enabled: z.boolean(),
    resistance: z.coerce.number().positive(),
    frequency: z.coerce.number().positive(),
});

export type SourceFormInput = z.infer<typeof sourceFormSchema>;

export const defaultSource: SourceFormInput = {
    name: "",
    phases: 3,
    voltage: 138,
    enabled: true,
    x1r1: 4,
    isc1: 4000,
    isc3: 3000,
    x0r0: 3,
    resistance: 15,
    frequency: 60,
};

// update general source

export const updateSourceGeneralFormSchema = sourceFormSchema.pick({
    name: true,
    enabled: true,
});

export type UpdateSourceGeneralFormInput = z.infer<
    typeof updateSourceGeneralFormSchema
>;

// update electrical source

export const updateSourceElectricalFormSchema = sourceFormSchema.pick({
    phases: true,
    voltage: true,
    x1r1: true,
    x0r0: true,
    isc1: true,
    isc3: true,
    resistance: true,
    frequency: true,
});

export type UpdateSourceElectricalFormInput = z.infer<
    typeof updateSourceElectricalFormSchema
>;
