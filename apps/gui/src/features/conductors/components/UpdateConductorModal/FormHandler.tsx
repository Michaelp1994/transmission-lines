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

export default function FormHandler({
    conductorId,
    onFinish,
}: FormHandlerProps) {
    const utils = trpc.useUtils();
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

    async function handleValid(values: ConductorFormInput) {
        await updateMutation.mutateAsync({ ...values, id: conductorId });
    }
    function handleInvalid(errors: FieldErrors<ConductorFormInput>) {
        console.error(errors);
    }
    const { data, error, isLoading } = trpc.conductor.getById.useQuery({
        id: conductorId,
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error</div>;
    }

    return (
        <BaseForm data={data} onValid={handleValid} onInvalid={handleInvalid} />
    );
}
