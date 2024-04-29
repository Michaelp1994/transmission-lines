import { z } from "zod";

// create / update

export const projectFormSchema = z.object({
    name: z.string().min(3).max(100),
});

export type ProjectFormInput = z.infer<typeof projectFormSchema>;

export const defaultProject: ProjectFormInput = {
    name: "",
};
