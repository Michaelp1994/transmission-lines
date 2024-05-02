import type { UpdateConductorLocationInput } from "@repo/validators";
import type { ConductorLocationFormInput } from "@repo/validators/forms/ConductorLocation.schema";
import type { FieldErrors } from "react-hook-form";
import BaseForm from "./BaseForm";
import toast from "~/utils/toast";
import trpc from "~/utils/trpc";

interface FormHandlerProps {
    conductorLocationId: number;
    onSubmit: () => void;
}

function handleInvalid(errors: FieldErrors<UpdateConductorLocationInput>) {
    console.log(errors);
}

export default function FormHandler({
    conductorLocationId,
    onSubmit,
}: FormHandlerProps) {
    const utils = trpc.useUtils();
    const { data, error, isLoading, isError } =
        trpc.conductorLocations.getById.useQuery({
            locationId: conductorLocationId,
        });

    const updateMutation = trpc.conductorLocations.update.useMutation({
        async onSuccess(values) {
            toast.success("Conductor location updated");
            await utils.conductorLocations.getAllByGeometryId.invalidate({
                geometryId: values.geometryId,
            });
            onSubmit();
        },
        onError(error) {
            toast.error("Conductor location not updated");
            console.log(error);
        },
    });

    function handleValid(values: ConductorLocationFormInput) {
        updateMutation.mutate({
            ...values,
            id: conductorLocationId,
        });
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <BaseForm data={data} onValid={handleValid} onInvalid={handleInvalid} />
    );
}
