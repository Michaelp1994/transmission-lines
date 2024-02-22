import { z } from "zod";

export const baseElementSchema = z.object({
    name: z.string(),
});

export type BaseInput = z.infer<typeof baseElementSchema>;
