import type { FieldErrors } from "react-hook-form";
import type { GenerateTowersFormInput } from "@repo/validators/forms/TransmissionTower.schema";
import type { LineID } from "@repo/validators/Ids";
import BaseForm from "./BaseForm";
import trpc from "~/utils/trpc";
import toast from "~/utils/toast";

function handleInvalid(errors: FieldErrors<GenerateTowersFormInput>) {
    console.log(errors);
}

interface FormWrapperProps {
    lineId: LineID;
    onFinish: () => void;
}

export default function FormWrapper({ lineId, onFinish }: FormWrapperProps) {
    const utils = trpc.useUtils();
    const generateMutation = trpc.tower.generate.useMutation({
        async onSuccess(values) {
            toast.success(`${values.length} generated successfully`);
            await utils.tower.getAllByLineId.invalidate({
                lineId,
            });
            onFinish();
        },
    });

    function handleValid(values: GenerateTowersFormInput) {
        generateMutation.mutate({ ...values, lineId });
    }

    return <BaseForm onValid={handleValid} onInvalid={handleInvalid} />;
}
