import type { SourceFormInput } from "@repo/validators/forms/Source.schema";
import type { ProjectID } from "@repo/validators/Ids";
import { useNavigate } from "@tanstack/react-router";
import type { FieldErrors } from "react-hook-form";
import BaseForm from "./BaseForm";
import toast from "~/utils/toast";
import trpc from "~/utils/trpc";

interface CreateSourceFormProps {
    projectId: ProjectID;
}

function handleInvalid(errors: FieldErrors<SourceFormInput>) {
    console.log(errors);
}

export default function CreateSourceForm({ projectId }: CreateSourceFormProps) {
    const navigate = useNavigate();

    const createMutation = trpc.source.create.useMutation({
        async onSuccess(values) {
            toast.success(`${values.name} has been added to the project.`);
            await navigate({
                to: "/projects/$projectId/sources/$sourceId",
                params: { projectId: values.projectId, sourceId: values.id },
            });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    function handleValid(values: SourceFormInput) {
        createMutation.mutate({
            ...values,
            projectId,
        });
    }

    return <BaseForm onValid={handleValid} onInvalid={handleInvalid} />;
}
