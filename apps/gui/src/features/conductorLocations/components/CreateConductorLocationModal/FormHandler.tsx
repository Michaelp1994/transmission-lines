import { CreateConductorLocationInput } from "@repo/validators";
import { FieldErrors } from "react-hook-form";

import CreateConductorLocationForm from "./BaseForm";

import trpc from "~/utils/trpc";

interface FormHandlerProps {
    geometryId: string;
    onSubmit: () => void;
}

export default function FormHandler({
    geometryId,
    onSubmit,
}: FormHandlerProps) {
    const createMutation = trpc.conductorLocations.create.useMutation({});
    const utils = trpc.useUtils();

    async function handleValid(data: CreateConductorLocationInput) {
        await createMutation.mutateAsync({ ...data, geometryId });
        await utils.conductorLocations.getAllByGeometryId.invalidate({
            geometryId,
        });
        onSubmit();
    }

    async function handleInvalid(
        errors: FieldErrors<CreateConductorLocationInput>
    ) {
        console.log(errors);
    }

    return (
        <CreateConductorLocationForm
            onValid={handleValid}
            onInvalid={handleInvalid}
        />
    );
}
