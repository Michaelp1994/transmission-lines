import type { TowerGeometryFormInput } from "@repo/validators/forms";
import { useNavigate } from "@tanstack/react-router";
import type { FieldErrors } from "react-hook-form";
import BaseForm from "./BaseForm";
import toast from "~/utils/toast";
import trpc from "~/utils/trpc";

export default function FormHandler() {
    const navigate = useNavigate();
    const createMutation = trpc.towerGeometry.create.useMutation({
        onSuccess(values) {
            toast.success(`${values.name} has been added.`);
            navigate({ to: "/tower-geometries" });
        },
        onError(error) {
            toast.error("Can't create Tower Geometry");
            console.log(error);
        },
    });

    async function handleValid(values: TowerGeometryFormInput) {
        await createMutation.mutateAsync(values);
    }
    async function handleInvalid(errors: FieldErrors<TowerGeometryFormInput>) {
        console.log(errors);
    }

    return <BaseForm onValid={handleValid} onInvalid={handleInvalid} />;
}
