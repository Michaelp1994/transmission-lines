import * as z from "zod";

export const conductorLocationSchema = z.object({
    x: z.number(),
    y: z.number(),
});

export type ConductorLocationInput = z.infer<typeof conductorLocationSchema>;

export const defaultConductorLocation: ConductorLocationInput = {
    x: 0,
    y: 0,
};
