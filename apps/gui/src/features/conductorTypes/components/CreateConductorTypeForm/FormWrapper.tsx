import { ConductorTypeFormInput } from "@repo/validators/forms/ConductorType.schema";
import { useNavigate } from "@tanstack/react-router";
import { FieldErrors } from "react-hook-form";

import BaseForm from "./BaseForm";

import toast from "~/utils/toast";
import trpc from "~/utils/trpc";

export default function FormWrapper() {
    const navigate = useNavigate();
    const createConductorMutation = trpc.conductorType.create.useMutation({
        onSuccess(values) {
            toast.success(`${values.name} has been added.`);
            navigate({ to: "/conductor-types" });
        },
        onError(error) {
            console.log(error);
            toast.error("Can't add Conductor Type");
        },
    });

    async function handleValid(values: ConductorTypeFormInput) {
        createConductorMutation.mutateAsync(values);
    }

    function handleInvalid(errors: FieldErrors<ConductorTypeFormInput>) {
        console.log(errors);
    }

    return <BaseForm onValid={handleValid} onInvalid={handleInvalid} />;
}
