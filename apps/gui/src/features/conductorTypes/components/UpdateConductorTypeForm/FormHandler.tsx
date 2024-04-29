import { ConductorTypeFormInput } from "@repo/validators/forms/ConductorType.schema";
import { ConductorTypeID } from "@repo/validators/Ids";
import { useNavigate } from "@tanstack/react-router";
import { FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";

import BaseForm from "./BaseForm";

import toast from "~/utils/toast";
import trpc from "~/utils/trpc";

interface FormHandlerProps {
    conductorTypeId: ConductorTypeID;
}

export default function FormHandler({ conductorTypeId }: FormHandlerProps) {
    const navigate = useNavigate();
    const { t } = useTranslation("conductorType");

    const { data, isLoading, error } = trpc.conductorType.getById.useQuery({
        id: conductorTypeId,
    });
    const updateMutation = trpc.conductorType.update.useMutation({
        onSuccess(data) {
            toast.success(`${data.name} has been updated.`);
            navigate({ to: "/conductor-types" });
        },
        onError(mutationError) {
            toast.error("Failed to update conductor type");
            console.log(mutationError);
        },
    });

    async function handleValid(values: ConductorTypeFormInput) {
        await updateMutation.mutateAsync({ ...values, id: conductorTypeId });
    }
    function handleInvalid(errors: FieldErrors<ConductorTypeFormInput>) {
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
