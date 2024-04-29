import { ConductorFormInput } from "@repo/validators/forms/Conductor.schema";
import { LineID } from "@repo/validators/Ids";
import { FieldErrors } from "react-hook-form";

import BaseForm from "./BaseForm";

import toast from "~/utils/toast";
import trpc from "~/utils/trpc";

interface FormHandlerProps {
    lineId: LineID;
    onFinished: () => void;
}

export default function FormHandler({ lineId, onFinished }: FormHandlerProps) {
    const utils = trpc.useUtils();
    const createConductorMutation = trpc.conductor.create.useMutation({
        onSuccess(data) {
            toast.success("Conductor created");
            utils.conductor.getAllByLineId.invalidate({
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
    function handleInvalid(errors: FieldErrors<ConductorFormInput>) {
        console.log(errors);
    }
    return <BaseForm onValid={handleValid} onInvalid={handleInvalid} />;
}