import type { TowerGeometryFormInput } from "@repo/validators/forms/TowerGeometry.schema";
import type { GeometryID } from "@repo/validators/Ids";
import { useNavigate } from "@tanstack/react-router";
import type { FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import BaseForm from "./BaseForm";
import toast from "~/utils/toast";
import trpc from "~/utils/trpc";

interface FormHandlerProps {
    geometryId: GeometryID;
}

function handleInvalid(errors: FieldErrors<TowerGeometryFormInput>) {
    console.log(errors);
}

export default function UpdateTowerGeometryForm({
    geometryId,
}: FormHandlerProps) {
    const { t } = useTranslation("towerGeometry");
    const navigate = useNavigate();

    const { data, error, isLoading, isError } =
        trpc.towerGeometry.getById.useQuery({
            id: geometryId,
        });
    const updateMutation = trpc.towerGeometry.update.useMutation({
        async onSuccess(values) {
            toast.success(`${values.name} has been updated.`);
            await navigate({ to: "/tower-geometries" });
        },
        onError(error) {
            toast.error("Can't update Tower Geometry");
            console.log(error);
        },
    });

    function handleValid(values: TowerGeometryFormInput) {
        updateMutation.mutate({
            ...values,
            id: geometryId,
        });
    }

    if (isLoading) {
        return <div>{t("general:loading")}</div>;
    }
    if (isError) {
        return <div>{t("general:errorMessage")}</div>;
    }

    return (
        <BaseForm data={data} onValid={handleValid} onInvalid={handleInvalid} />
    );
}
