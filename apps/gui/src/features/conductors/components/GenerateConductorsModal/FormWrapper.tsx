import type { GenerateConductorsFormInput } from "@repo/validators/forms/Conductor.schema";
import type { LineID } from "@repo/validators/Ids";
import type { FieldErrors } from "react-hook-form";
import BaseForm from "./BaseForm";
import toast from "~/utils/toast";
import trpc from "~/utils/trpc";

interface FormWrapperProps {
    lineId: LineID;
    onFinish: () => void;
}

function handleInvalid(errors: FieldErrors<GenerateConductorsFormInput>) {
    console.log(errors);
}

export default function FormWrapper({ lineId, onFinish }: FormWrapperProps) {
    const utils = trpc.useUtils();
    const generateConductorsMutation = trpc.conductor.generate.useMutation({
        async onSuccess(data) {
            toast.success(`${data.length} Conductors successfully generated`);
            await utils.conductor.getAllByLineId.invalidate({
                lineId,
            });
            onFinish();
        },
        onError(error) {
            toast.error("Can't generate conductors");
            console.log(error);
        },
    });

    function handleValid(values: GenerateConductorsFormInput) {
        generateConductorsMutation.mutate({
            ...values,
            lineId,
        });
    }

    return <BaseForm onValid={handleValid} onInvalid={handleInvalid} />;
}
