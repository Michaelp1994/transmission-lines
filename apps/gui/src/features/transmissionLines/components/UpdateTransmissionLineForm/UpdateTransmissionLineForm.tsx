import { useNavigate } from "@tanstack/react-router";
import type { FieldErrors } from "react-hook-form";
import type { TransmissionLineFormInput } from "@repo/validators/forms/TransmissionLine.schema";
import type { LineID } from "@repo/validators/Ids";
import BaseForm from "./BaseForm";
import toast from "~/utils/toast";
import trpc from "~/utils/trpc";

interface UpdateTransmissionLineFormProps {
    lineId: LineID;
}

function handleInvalid(errors: FieldErrors<TransmissionLineFormInput>) {
    console.log(errors);
}

export default function UpdateTransmissionLineForm({
    lineId,
}: UpdateTransmissionLineFormProps) {
    const navigate = useNavigate();
    const { data, isLoading, isError } = trpc.transmissionLine.getById.useQuery(
        {
            id: lineId,
        }
    );

    const updateTransmissionLineMutation =
        trpc.transmissionLine.update.useMutation({
            async onSuccess(values) {
                toast.success(`${values.name} has been updated.`);
                await navigate({
                    to: "/projects/$projectId",
                    params: { projectId: values.projectId },
                });
            },
        });

    function handleValid(values: TransmissionLineFormInput) {
        updateTransmissionLineMutation.mutate({ ...values, id: lineId });
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError || !data) {
        return <div>Error...</div>;
    }

    return (
        <BaseForm data={data} onValid={handleValid} onInvalid={handleInvalid} />
    );
}
