import type { CreateProjectInput } from "@repo/validators";
import { useNavigate } from "@tanstack/react-router";
import type { FieldErrors } from "react-hook-form";
import BaseForm from "./BaseForm";
import toast from "~/utils/toast";
import trpc from "~/utils/trpc";

function handleInvalid(error: FieldErrors<CreateProjectInput>) {
    console.log(error);
}

export default function CreateProjectForm() {
    const navigate = useNavigate();
    const createMutation = trpc.project.create.useMutation({
        async onSuccess(data) {
            toast.success(`${data.name} has been created.`);
            await navigate({
                to: "/projects/$projectId",
                params: {
                    projectId: data.id,
                },
            });
        },
        onError(error) {
            toast.error(`Can't create project`);
            console.log("Error", error);
        },
    });

    function handleValid(values: CreateProjectInput) {
        createMutation.mutate(values);
    }

    return <BaseForm onValid={handleValid} onInvalid={handleInvalid} />;
}
