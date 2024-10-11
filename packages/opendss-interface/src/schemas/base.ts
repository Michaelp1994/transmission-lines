import { z } from "zod";

export const baseElementSchema = z.object({
    /** Name of the element. */
    name: z.string(),
});

export type BaseElementInput = z.infer<typeof baseElementSchema>;

export const openDssBaseElementSchema = z.object({
    /** Name of the element. */
    name: z.string(),
});

export type OpenDSSBaseElement = z.infer<typeof openDssBaseElementSchema>;
