import type { ConductorTypeFormInput } from "@repo/validators/forms/ConductorType.schema";
import type { ConductorTypeID } from "@repo/validators/Ids";
import { useNavigate } from "@tanstack/react-router";
import type { FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import BaseForm from "./BaseForm";
import toast from "~/utils/toast";
import trpc from "~/utils/trpc";

interface FormHandlerProps {
    conductorTypeId: ConductorTypeID;
}

function handleInvalid(errors: FieldErrors<ConductorTypeFormInput>) {
    console.log(errors);
}

export default function FormHandler({ conductorTypeId }: FormHandlerProps) {
    const navigate = useNavigate();
    const { t } = useTranslation("conductorType");

    const { data, isLoading, error } = trpc.conductorType.getById.useQuery({
        id: conductorTypeId,
    });
    const updateMutation = trpc.conductorType.update.useMutation({
        async onSuccess(values) {
            toast.success(`${values.name} has been updated.`);
            await navigate({ to: "/conductor-types" });
        },
        onError(error) {
            toast.error("Failed to update conductor type");
            console.log(error);
        },
    });

    function handleValid(values: ConductorTypeFormInput) {
        updateMutation.mutate({ ...values, id: conductorTypeId });
    }

    if (isLoading) {
        return <div>{t("general:loading")}</div>;
    }
    if (error) {
        return <div>{t("general:errorMessage")}</div>;
    }

    return (
        <BaseForm data={data} onValid={handleValid} onInvalid={handleInvalid} />
    );
}
