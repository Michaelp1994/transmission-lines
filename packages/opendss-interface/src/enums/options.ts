import { z } from "zod";

export const cktModelSchema = z.enum(["Multiphase", "Positive"]);

export type CktModelEnum = z.infer<typeof cktModelSchema>;

export const controlModeOptionSchema = z.enum([
    "OFF",
    "STATIC",
    "EVENT",
    "TIME",
]);

export type ControlModeOptionEnum = z.infer<typeof controlModeOptionSchema>;

export const earthModelSchema = z.enum(["Carson", "FullCarson", "Deri"]);

export type EarthModelEnum = z.infer<typeof earthModelSchema>;

export const randomSchema = z.enum([
    "Uniform",
    "Gaussian",
    "Lognormal",
    "None",
]);

export type RandomEnum = z.infer<typeof randomSchema>;

export const loadModelSchema = z.enum(["Powerflow", "Admittance"]);

export type LoadModelEnum = z.infer<typeof loadModelSchema>;

export const loadShapeClassSchema = z.enum(["Daily", "Yearly", "Duty", "None"]);

export type LoadShapeClassEnum = z.infer<typeof loadShapeClassSchema>;

export const modeSchema = z.enum([
    "Daily",
    "Yearly DIrect",
    "DUtycycle",
    "Time",
    "DYnamic",
    "Harmonic",
    "HarmonicT",
    "M1",
    "M2",
    "M3",
    "Faultstudy",
    "MF",
    "Peakday",
    "LD1",
    "LD2",
    "AutoAdd",
    "YearlyVQ",
    "DutyVQ",
]);

export type ModeEnum = z.infer<typeof modeSchema>;

export const reduceOptionSchema = z.enum([
    "Default",
    "Shortlines",
    "MergeParallel",
    "BreakLoops",
    "Switches",
    "Ends",
    "Laterals",
]);

export type ReduceOptionEnum = z.infer<typeof reduceOptionSchema>;
