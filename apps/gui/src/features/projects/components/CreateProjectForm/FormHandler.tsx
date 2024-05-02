import type { CreateProjectInput } from "@repo/validators";
import { useNavigate } from "@tanstack/react-router";
import { TRPCClientError } from "@trpc/client";
import type { FieldErrors } from "react-hook-form";
import CreateProjectForm from "./CreateProjectForm";
import toast from "~/utils/toast";
import trpc from "~/utils/trpc";

export default function FormHandler() {
    const navigate = useNavigate();
    const createMutation = trpc.project.create.useMutation({
        onSuccess(data) {
            toast.success(`${data.name} has been created.`);
            navigate({
                to: "/projects/$projectId",
                params: {
                    projectId: data.id,
                },
            });
        },
        onError(error) {
            if (error instanceof TRPCClientError) {
                if (error.data?.zodError) {
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
        },
    });

    function handleValid(values: CreateProjectInput) {
        createMutation.mutate(values);
    }

    function handleInvalid(error: FieldErrors<CreateProjectInput>) {
        console.log(error);
    }

    return (
        <CreateProjectForm onValid={handleValid} onInvalid={handleInvalid} />
    );
}
