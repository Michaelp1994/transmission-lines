import { z } from "zod";

// create / update

export const conductorTypeFormSchema = z.object({
    name: z.string().min(2),
    surfaceArea: z.coerce.number().positive().optional(),
    stranding: z.string().optional(),
    outerDiameter: z.coerce.number().positive(),
    coreDiameter: z.coerce.number().positive().optional(),
    layers: z.coerce.number().optional(),
    currentCapacity: z.coerce.number().positive().optional(),
    dcResistance25: z.coerce.number().positive().optional(),
    acResistance25: z.coerce.number().positive().optional(),
    acResistance50: z.coerce.number().positive().optional(),
    acResistance75: z.coerce.number().positive(),
    gmr: z.coerce.number().positive(),
});

export type ConductorTypeFormInput = z.infer<typeof conductorTypeFormSchema>;

export const defaultConductorType: ConductorTypeFormInput = {
    name: "",
    surfaceArea: 0,
    stranding: "",
    outerDiameter: 0,
    coreDiameter: 0,
    layers: 0,
    currentCapacity: 0,
    dcResistance25: 0,
    acResistance25: 0,
    acResistance50: 0,
    acResistance75: 0,
    gmr: 0,
};
