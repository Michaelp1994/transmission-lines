import { TransmissionTowerFormInput } from "@repo/validators/forms/TransmissionTower.schema";
import { LineID } from "@repo/validators/Ids";
import { FieldErrors } from "react-hook-form";

import BaseForm from "./BaseForm";

import toast from "~/utils/toast";
import trpc from "~/utils/trpc";

interface FormHandlerProps {
    lineId: LineID;
    onClose: () => void;
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

    async function handleValid(values: TransmissionTowerFormInput) {
        await createTowerMutation.mutateAsync({ ...values, lineId });
        onClose();
    }

    function handleInvalid(errors: FieldErrors<TransmissionTowerFormInput>) {
        console.log(errors);
    }

    return <BaseForm onValid={handleValid} onInvalid={handleInvalid} />;
}
