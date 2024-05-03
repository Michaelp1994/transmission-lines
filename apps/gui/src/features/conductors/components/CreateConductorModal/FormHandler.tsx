import type { ConductorFormInput } from "@repo/validators/forms/Conductor.schema";
import type { LineID } from "@repo/validators/Ids";
import type { FieldErrors } from "react-hook-form";
import BaseForm from "./BaseForm";
import toast from "~/utils/toast";
import trpc from "~/utils/trpc";

interface FormHandlerProps {
    lineId: LineID;
    onFinished: () => void;
}

function handleInvalid(errors: FieldErrors<ConductorFormInput>) {
    console.log(errors);
}

export default function FormHandler({ lineId, onFinished }: FormHandlerProps) {
    const utils = trpc.useUtils();
    const createConductorMutation = trpc.conductor.create.useMutation({
        async onSuccess(data) {
            toast.success("Conductor created");
            await utils.conductor.getAllByLineId.invalidate({
                lineId: data.lineId,
            });
            onFinished();
        },
        onError(error) {
            toast.error("Failed to create conductor");
            console.error(error);
        },
    });

    function handleValid(data: ConductorFormInput) {
        createConductorMutation.mutate({ ...data, lineId });
    }

    return <BaseForm onValid={handleValid} onInvalid={handleInvalid} />;
}
