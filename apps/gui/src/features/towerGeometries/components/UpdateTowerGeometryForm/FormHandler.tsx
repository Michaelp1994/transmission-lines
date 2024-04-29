import { TowerGeometryFormInput } from "@repo/validators/forms/TowerGeometry.schema";
import { GeometryID } from "@repo/validators/Ids";
import { useNavigate } from "@tanstack/react-router";
import { FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";

import BaseForm from "./BaseForm";

import toast from "~/utils/toast";
import trpc from "~/utils/trpc";

interface FormHandlerProps {
    geometryId: GeometryID;
}

export default function FormHandler({ geometryId }: FormHandlerProps) {
    const { t } = useTranslation("towerGeometry");
    const navigate = useNavigate();

    const { data, error, isLoading } = trpc.towerGeometry.getById.useQuery({
        id: geometryId,
    });
    const updateMutation = trpc.towerGeometry.update.useMutation({
        onSuccess(values) {
            toast.success(`${values.name} has been updated.`);
            navigate({ to: "/tower-geometries" });
        },
        onError(error) {
            toast.error("Can't update Tower Geometry");
            console.log(error);
        },
    });

    async function handleValid(values: TowerGeometryFormInput) {
        await updateMutation.mutateAsync({
            ...values,
            id: geometryId,
        });
    }

    async function handleInvalid(errors: FieldErrors<TowerGeometryFormInput>) {
        console.log(errors);
    }

    if (isLoading) {
        return <div>{t("general:loading")}</div>;
    }
    if (error || !data) {
        return <div>{t("general:errorMessage")}</div>;
    }

    return (
        <BaseForm data={data} onValid={handleValid} onInvalid={handleInvalid} />
    );
}
