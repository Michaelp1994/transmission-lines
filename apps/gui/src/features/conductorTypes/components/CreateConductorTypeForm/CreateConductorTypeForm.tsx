import type { ConductorTypeFormInput } from "@repo/validators/forms/ConductorType.schema";
import { useNavigate } from "@tanstack/react-router";
import type { FieldErrors } from "react-hook-form";
import BaseForm from "./BaseForm";
import toast from "~/utils/toast";
import trpc from "~/utils/trpc";

function handleInvalid(errors: FieldErrors<ConductorTypeFormInput>) {
    console.log(errors);
}

export default function CreateConductorTypeForm() {
    const navigate = useNavigate();
    const createConductorMutation = trpc.conductorType.create.useMutation({
        async onSuccess(values) {
            toast.success(`${values.name} has been added.`);
            await navigate({ to: "/conductor-types" });
        },
        onError(error) {
            console.log(error);
            toast.error("Can't add Conductor Type");
        },
    });

    function handleValid(values: ConductorTypeFormInput) {
        createConductorMutation.mutate(values);
    }

    return <BaseForm onValid={handleValid} onInvalid={handleInvalid} />;
}
