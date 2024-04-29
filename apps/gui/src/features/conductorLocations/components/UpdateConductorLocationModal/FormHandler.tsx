import { UpdateConductorLocationInput } from "@repo/validators";
import { ConductorLocationFormInput } from "@repo/validators/forms/ConductorLocation.schema";
import { FieldErrors } from "react-hook-form";

import BaseForm from "./BaseForm";

import toast from "~/utils/toast";
import trpc from "~/utils/trpc";

interface FormHandlerProps {
    conductorLocationId: number;
    onSubmit: () => void;
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
        async onError(error) {
            toast.error("Conductor location not updated");
            console.log(error);
        },
    });

    async function handleValid(values: ConductorLocationFormInput) {
        await updateMutation.mutateAsync({
            ...values,
            id: conductorLocationId,
        });
    }

    async function handleInvalid(
        errors: FieldErrors<UpdateConductorLocationInput>
    ) {
        console.log(errors);
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError || !data) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <BaseForm data={data} onValid={handleValid} onInvalid={handleInvalid} />
    );
}
