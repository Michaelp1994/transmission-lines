import { styled } from "@linaria/react";
import { ProjectID } from "@repo/validators/schemas/Ids.schema";
import { useNavigate } from "@tanstack/react-router";
import { format } from "date-fns";
import { FieldErrors } from "react-hook-form";
import { toast } from "sonner";

import BaseForm from "./BaseForm";
import { CreateSourceFormInput } from "./FormSchema";

import trpc from "~/utils/trpc";

interface CreateSourceFormProps {
    projectId: ProjectID;
}

export default function CreateSourceForm({ projectId }: CreateSourceFormProps) {
    const navigate = useNavigate();
    const createMutation = trpc.source.create.useMutation({
        onSuccess: (result) => {
            toast.success(`${result.name} has been added to the project.`, {
                description: format(new Date(), "PPPPpp"),
            });
            navigate({ to: "/projects/$projectId", params: { projectId } });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    async function handleValid(values: CreateSourceFormInput) {
        await createMutation.mutateAsync({ ...values, projectId });
    }

    async function handleInvalid(errors: FieldErrors<CreateSourceFormInput>) {
        console.log(errors);
    }

    return (
        <Wrapper>
            <BaseForm onValid={handleValid} onInvalid={handleInvalid} />
        </Wrapper>
    );
}

const Wrapper = styled.div``;
