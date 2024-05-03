import type { ConductorLocationFormInput } from "@repo/validators/forms";
import type { FieldErrors } from "react-hook-form";
import BaseForm from "./BaseForm";
import toast from "~/utils/toast";
import trpc from "~/utils/trpc";

interface FormHandlerProps {
    geometryId: string;
    onFinish: () => void;
}

function handleInvalid(errors: FieldErrors<ConductorLocationFormInput>) {
    console.log(errors);
}

export default function FormHandler({
    geometryId,
    onFinish,
}: FormHandlerProps) {
    const utils = trpc.useUtils();
    const createMutation = trpc.conductorLocations.create.useMutation({
        onSuccess: async () => {
            toast.success("Conductor location created");
            await utils.conductorLocations.getAllByGeometryId.invalidate({
                geometryId,
            });
            onFinish();
        },
        onError: (error) => {
            toast.error("Failed to create conductor location");
            console.error(error);
        },
    });

    function handleValid(data: ConductorLocationFormInput) {
        createMutation.mutate({ ...data, geometryId });
    }

    return <BaseForm onValid={handleValid} onInvalid={handleInvalid} />;
}
