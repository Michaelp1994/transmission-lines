import * as z from "zod";

/** @see https://github.com/aiji42/zod-i18n for Internationalization */

export const createConductorSchema = z.object({
    name: z.string().min(2).max(50).trim(),
    fromPhase: z.number().nonnegative(),
    toPhase: z.number().nonnegative(),
    bundleNumber: z.number().min(1),
    bundleSpacing: z.number().nonnegative(),
    isNeutral: z.boolean(),
    typeId: z.coerce
        .number()
        .positive({ message: "Please select a conductor type" }),
});

export type CreateConductorInput = z.infer<typeof createConductorSchema>;

// update

export const updateConductorSchema = createConductorSchema.extend({
    id: z.number(),
});

export type UpdateConductorInput = z.infer<typeof updateConductorSchema>;

export const defaultConductor: CreateConductorInput = {
    name: "",
    fromPhase: 0,
    toPhase: 0,
    isNeutral: false,
    bundleNumber: 1,
    bundleSpacing: 0,
    typeId: 0,
};
