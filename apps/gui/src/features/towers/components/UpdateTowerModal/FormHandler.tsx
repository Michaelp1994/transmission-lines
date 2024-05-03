import type { UpdateTransmissionTowerInput } from "@repo/validators";
import type { TowerID } from "@repo/validators/Ids";
import type { FieldErrors } from "react-hook-form";
import BaseForm from "./BaseForm";
import toast from "~/utils/toast";
import trpc from "~/utils/trpc";

interface FormHandlerProps {
    towerId: TowerID;
    onFinish: () => void;
}

function handleInvalid(errors: FieldErrors<UpdateTransmissionTowerInput>) {
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

    function handleValid(values: UpdateTransmissionTowerInput) {
        updateMutation.mutate(values);
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <div>Error</div>;
    }

    return (
        <BaseForm data={data} onValid={handleValid} onInvalid={handleInvalid} />
    );
}
