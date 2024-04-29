import { TransmissionLineFormInput } from "@repo/validators/forms";
import { ProjectID } from "@repo/validators/Ids";
import { useNavigate } from "@tanstack/react-router";
import { FieldErrors } from "react-hook-form";

import CreateTransmissionLineForm from "./CreateTransmissionLineForm";

import toast from "~/utils/toast";
import trpc from "~/utils/trpc";

interface FormWrapperProps {
    projectId: ProjectID;
}

export default function FormWrapper({ projectId }: FormWrapperProps) {
    const navigate = useNavigate();
    const createTransmissionLineMutation =
        trpc.transmissionLine.create.useMutation({
            onSuccess(data) {
                toast.success(`${data.name} has been added to the project.`);
                navigate({
                    to: `/projects/$projectId/lines/$lineId`,
                    params: { projectId: data.projectId, lineId: data.id },
                });
            },
            onError(error, variables) {
                toast.error(
                    `Failed to create transmission line: ${variables.name}.`
                );
                console.log(error);
            },
        });

    async function handleValid(values: TransmissionLineFormInput) {
        await createTransmissionLineMutation.mutateAsync({
            ...values,
            projectId,
        });
    }

    async function handleInvalid(
        errors: FieldErrors<TransmissionLineFormInput>
    ) {
        console.log(errors);
    }

    return (
        <CreateTransmissionLineForm
            onValid={handleValid}
            onInvalid={handleInvalid}
            projectId={projectId}
        />
    );
}
