import type { TransmissionLineFormInput } from "@repo/validators/forms";
import type { ProjectID } from "@repo/validators/Ids";
import { useNavigate } from "@tanstack/react-router";
import type { FieldErrors } from "react-hook-form";
import CreateTransmissionLineForm from "./CreateTransmissionLineForm";
import toast from "~/utils/toast";
import trpc from "~/utils/trpc";

interface FormWrapperProps {
    projectId: ProjectID;
}

async function handleInvalid(errors: FieldErrors<TransmissionLineFormInput>) {
    console.log(errors);
}

export default function FormWrapper({ projectId }: FormWrapperProps) {
    const navigate = useNavigate();
    const createTransmissionLineMutation =
        trpc.transmissionLine.create.useMutation({
            async onSuccess(data) {
                toast.success(`${data.name} has been added to the project.`);
                await navigate({
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

    function handleValid(values: TransmissionLineFormInput) {
        createTransmissionLineMutation.mutate({
            ...values,
            projectId,
        });
    }

    return (
        <CreateTransmissionLineForm
            projectId={projectId}
            onValid={handleValid}
            onInvalid={handleInvalid}
        />
    );
}
