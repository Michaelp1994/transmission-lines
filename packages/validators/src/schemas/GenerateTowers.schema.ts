import * as z from "zod";

export const generateTowersSchema = z.object({
    namePrefix: z.string().min(1),
    geometryId: z.coerce
        .number()
        .positive({ message: "Please select a geometry type" }),
    numTowers: z.number().positive(),
    resistance: z.number().positive(),
    distance: z.number().positive(),
});

export type GenerateTowersInput = z.infer<typeof generateTowersSchema>;

export const defaultGenerateTowers: GenerateTowersInput = {
    namePrefix: "T",
    geometryId: 1,
    numTowers: 10,
    resistance: 15,
    distance: 10,
};
