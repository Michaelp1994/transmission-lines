import * as z from "zod";

export const createConductorLocationSchema = z.object({
    x: z.number(),
    y: z.number(),
});

export type CreateConductorLocationInput = z.infer<
    typeof createConductorLocationSchema
>;

export const defaultConductorLocation: CreateConductorLocationInput = {
    x: 0,
    y: 0,
};

// update

export const updateConductorLocationSchema =
    createConductorLocationSchema.extend({
        id: z.number(),
    });

export type UpdateConductorLocationInput = z.infer<
    typeof updateConductorLocationSchema
>;
