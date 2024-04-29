import { GenerateConductorsFormInput } from "@repo/validators/forms/Conductor.schema";
import { LineID } from "@repo/validators/Ids";
import { FieldErrors } from "react-hook-form";

import BaseForm from "./BaseForm";

import toast from "~/utils/toast";
import trpc from "~/utils/trpc";

interface FormWrapperProps {
    lineId: LineID;
    onFinish: () => void;
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
        async onError(error) {
            toast.error("Can't generate conductors");
            console.log(error);
        },
    });

    async function handleValid(values: GenerateConductorsFormInput) {
        await generateConductorsMutation.mutateAsync({
            ...values,
            lineId,
        });
    }

    function handleInvalid(errors: FieldErrors<GenerateConductorsFormInput>) {
        console.log(errors);
    }

    return <BaseForm onValid={handleValid} onInvalid={handleInvalid} />;
}
