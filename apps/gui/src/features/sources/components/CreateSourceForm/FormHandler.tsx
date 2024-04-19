import { styled } from "@linaria/react";
import { ProjectID } from "@repo/validators/schemas/Ids.schema";
import { useNavigate } from "@tanstack/react-router";
import { format } from "date-fns";
import { FieldErrors } from "react-hook-form";
import { toast } from "sonner";

import CreateSourceForm from "./CreateSourceForm";
import { CreateSourceFormInput } from "./FormSchema";

import trpc from "~/utils/trpc";

interface FormHandlerProps {
    projectId: ProjectID;
}

export default function FormHandler({ projectId }: FormHandlerProps) {
    const navigate = useNavigate();
    const createMutation = trpc.source.create.useMutation();

    async function handleValid(values: CreateSourceFormInput) {
        await createMutation.mutateAsync({ ...values, projectId });
        toast.success(`${values.name} has been added to the project.`, {
            description: format(new Date(), "PPPPpp"),
        });
        navigate({ to: "/projects/$projectId", params: { projectId } });
    }

    async function handleInvalid(errors: FieldErrors<CreateSourceFormInput>) {
        console.log(errors);
    }

    return (
        <Wrapper>
            <CreateSourceForm onValid={handleValid} onInvalid={handleInvalid} />
        </Wrapper>
    );
}

const Wrapper = styled.div``;
