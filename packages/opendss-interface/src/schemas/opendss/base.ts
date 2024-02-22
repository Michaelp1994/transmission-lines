import { z } from "zod";

export const baseElementSchema = z.object({
    name: z.string(),
});

export type OpenDSSElement = z.infer<typeof baseElementSchema>;
