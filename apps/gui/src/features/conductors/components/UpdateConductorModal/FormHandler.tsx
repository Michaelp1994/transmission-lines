import type { ConductorFormInput } from "@repo/validators/forms/Conductor.schema";
import type { ConductorID } from "@repo/validators/Ids";
import type { FieldErrors } from "react-hook-form";
import BaseForm from "./BaseForm";
import toast from "~/utils/toast";
import trpc from "~/utils/trpc";

interface FormHandlerProps {
    conductorId: ConductorID;
    onFinish: () => void;
}

function handleInvalid(errors: FieldErrors<ConductorFormInput>) {
    console.error(errors);
}

export default function FormHandler({
    conductorId,
    onFinish,
}: FormHandlerProps) {
    const utils = trpc.useUtils();
    const { data, isError, isLoading } = trpc.conductor.getById.useQuery({
        id: conductorId,
    });
    const updateMutation = trpc.conductor.update.useMutation({
        async onSuccess(values) {
            await utils.conductor.getAllByLineId.invalidate({
                lineId: values.lineId,
            });
            toast.success("Conductor updated");
            onFinish();
        },
        onError(error) {
            toast.error("Conductor not updated");
            console.log(error);
        },
    });

    function handleValid(values: ConductorFormInput) {
        updateMutation.mutate({ ...values, id: conductorId });
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError || !data) {
        return <div>Error</div>;
    }

    return (
        <BaseForm data={data} onValid={handleValid} onInvalid={handleInvalid} />
    );
}
