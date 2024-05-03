import type { TransmissionTowerFormInput } from "@repo/validators/forms/TransmissionTower.schema";
import type { LineID } from "@repo/validators/Ids";
import type { FieldErrors } from "react-hook-form";
import BaseForm from "./BaseForm";
import toast from "~/utils/toast";
import trpc from "~/utils/trpc";

interface FormHandlerProps {
    lineId: LineID;
    onClose: () => void;
}

function handleInvalid(errors: FieldErrors<TransmissionTowerFormInput>) {
    console.log(errors);
}

export default function FormHandler({ lineId, onClose }: FormHandlerProps) {
    const utils = trpc.useUtils();

    const createTowerMutation = trpc.tower.create.useMutation({
        async onSuccess(values) {
            toast.success(`${values.name} has been created.`);
            await utils.tower.getAllByLineId.invalidate({
                lineId,
            });
            onClose();
        },
        onError(error) {
            toast.error("Can't create Tower");
            console.log(error);
        },
    });

    function handleValid(values: TransmissionTowerFormInput) {
        createTowerMutation.mutate({ ...values, lineId });
        onClose();
    }

    return <BaseForm onValid={handleValid} onInvalid={handleInvalid} />;
}
