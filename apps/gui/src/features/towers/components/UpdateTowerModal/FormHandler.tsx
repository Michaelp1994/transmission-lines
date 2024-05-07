import type { TowerID } from "@repo/validators/Ids";
import type { FieldErrors } from "react-hook-form";
import type { TransmissionTowerFormInput } from "@repo/validators/forms/TransmissionTower.schema";
import BaseForm from "./BaseForm";
import toast from "~/utils/toast";
import trpc from "~/utils/trpc";

interface FormHandlerProps {
    towerId: TowerID;
    onFinish: () => void;
}

function handleInvalid(errors: FieldErrors<TransmissionTowerFormInput>) {
    console.error(errors);
}

export default function FormHandler({ towerId, onFinish }: FormHandlerProps) {
    const utils = trpc.useUtils();
    const { data, isLoading, isError } = trpc.tower.getById.useQuery({
        id: towerId,
    });
    const updateMutation = trpc.tower.update.useMutation({
        async onSuccess(values) {
            await utils.tower.getAllByLineId.invalidate({
                lineId: values.lineId,
            });
            toast.success("Transmission tower updated");
            onFinish();
        },
        onError(error) {
            toast.error("Transmission tower not updated");
            console.log(error);
        },
    });

    function handleValid(values: TransmissionTowerFormInput) {
        updateMutation.mutate({ ...values, id: towerId });
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
