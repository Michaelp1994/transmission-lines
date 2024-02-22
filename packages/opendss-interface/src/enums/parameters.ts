import { z } from "zod";

export const scanTypeSchema = z.enum(["pos", "zero", "none"]);

export type ScanTypeEnum = z.infer<typeof scanTypeSchema>;

export const sequenceSchema = z.enum(["pos", "zero", "none"]);

export type SequenceEnum = z.infer<typeof sequenceSchema>;

export const unitsSchema = z.enum(["mi", "kft", "km", "m", "Ft", "in", "cm"]);

export type UnitsEnum = z.infer<typeof unitsSchema>;

export const earthModelSchema = z.enum(["Carson", "FullCarson", "Deri"]);

export type EarthModelEnum = z.infer<typeof earthModelSchema>;

export const connSchema = z.enum(["wye", "delta", "LN", "LL"]);

export type ConnEnum = z.infer<typeof connSchema>;

export const modelSchema = z.enum(["Thevenin", "Ideal"]);

export type ModelEnum = z.infer<typeof modelSchema>;

export const allUnitsSchema = z.enum([
    "mi",
    "kft",
    "km",
    "m",
    "Ft",
    "in",
    "cm",
    "mm",
]);

export type AllUnitsEnum = z.infer<typeof allUnitsSchema>;
