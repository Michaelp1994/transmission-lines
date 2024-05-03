import type { TowerGeometryFormInput } from "@repo/validators/forms";
import { useNavigate } from "@tanstack/react-router";
import type { FieldErrors } from "react-hook-form";
import BaseForm from "./BaseForm";
import toast from "~/utils/toast";
import trpc from "~/utils/trpc";

function handleInvalid(errors: FieldErrors<TowerGeometryFormInput>) {
    console.log(errors);
}

export default function FormHandler() {
    const navigate = useNavigate();
    const createMutation = trpc.towerGeometry.create.useMutation({
        async onSuccess(values) {
            toast.success(`${values.name} has been added.`);
            await navigate({ to: "/tower-geometries" });
        },
        onError(error) {
            toast.error("Can't create Tower Geometry");
            console.log(error);
        },
    });

    function handleValid(values: TowerGeometryFormInput) {
        createMutation.mutate(values);
    }

    return <BaseForm onValid={handleValid} onInvalid={handleInvalid} />;
}
