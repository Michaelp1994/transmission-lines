import { CreateProjectInput } from "@repo/validators";
import { useNavigate } from "@tanstack/react-router";
import { TRPCClientError } from "@trpc/client";

import CreateProjectForm from "./CreateProjectForm";

import toast from "~/utils/toast";
import trpc from "~/utils/trpc";

export default function FormHandler() {
    const navigate = useNavigate();
    const createMutation = trpc.project.create.useMutation({});
    async function handleSubmit(values: CreateProjectInput) {
        try {
            const newProject = await createMutation.mutateAsync(values);
            toast.success(`${newProject.name} has been created.`);
            navigate({
                to: "/projects/$projectId",
                params: {
                    projectId: newProject.id,
                },
            });
        } catch (error) {
            if (error instanceof TRPCClientError) {
                if (error?.data?.zodError) {
                    toast.error(
                        `name: ${error.data.zodError.fieldErrors.name[0]}`
                    );
                    // TODO: send zod errors to form to display.
                    // form.setError("name", {
                    //     message: error.data.zodError.fieldErrors.name[0],
                    // });
                } else {
                    toast.error(`Server Side Error`);
                }
            } else {
                toast.error(`Server Side Error!`);
            }
        }
    }
    return <CreateProjectForm onSubmit={handleSubmit} />;
}
