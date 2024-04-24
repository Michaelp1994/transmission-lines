import { CreateSourceFormInput } from "@repo/validators/forms/Source.schema";
import { ProjectID } from "@repo/validators/schemas/Ids.schema";
import { useNavigate } from "@tanstack/react-router";
import { FieldErrors } from "react-hook-form";

import BaseForm from "./BaseForm";

import toast from "~/utils/toast";
import trpc from "~/utils/trpc";

interface CreateSourceFormProps {
    projectId: ProjectID;
}

export default function CreateSourceForm({ projectId }: CreateSourceFormProps) {
    const navigate = useNavigate();

    const createMutation = trpc.source.create.useMutation({
        onSuccess: (result) => {
            toast.success(`${result.name} has been added to the project.`);
            navigate({ to: "/projects/$projectId", params: { projectId } });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    async function handleValid(values: CreateSourceFormInput) {
        await createMutation.mutateAsync({
            ...values,
            projectId,
        });
    }

    async function handleInvalid(errors: FieldErrors<CreateSourceFormInput>) {
        console.log(errors);
    }

    return <BaseForm onValid={handleValid} onInvalid={handleInvalid} />;
}
