import { CreateSourceInput, createSourceSchema } from "@repo/validators";

export const formSchema = createSourceSchema.omit({ projectId: true });

export type CreateSourceFormInput = Omit<CreateSourceInput, "projectId">;
