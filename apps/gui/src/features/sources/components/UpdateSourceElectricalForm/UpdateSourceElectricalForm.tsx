import type { UpdateSourceElectricalFormInput } from "@repo/validators/forms/Source.schema";
import type { SourceID } from "@repo/validators/Ids";
import { useNavigate } from "@tanstack/react-router";
import type { FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import BaseForm from "./BaseForm";
import toast from "~/utils/toast";
import trpc from "~/utils/trpc";

interface FormHandlerProps {
    sourceId: SourceID;
}

function handleInvalid(errors: FieldErrors<UpdateSourceElectricalFormInput>) {
    console.log(errors);
}

export default function UpdateSourceElectricalForm({
    sourceId,
}: FormHandlerProps) {
    const navigate = useNavigate();
    const { t } = useTranslation("source");
    const { data, isLoading, isError } = trpc.source.getById.useQuery({
        id: sourceId,
    });
    const updateSourceMutation = trpc.source.updateElectrical.useMutation({
        async onSuccess(values) {
            toast.success(`${values.name} has been updated.`);
            await navigate({
                to: "/projects/$projectId/sources",
                params: { projectId: values.projectId },
            });
        },
    });

    function handleValid(values: UpdateSourceElectricalFormInput) {
        updateSourceMutation.mutate({
            ...values,
            id: sourceId,
        });
    }

    if (isLoading) {
        return <div>{t("general:loading")}</div>;
    }
    if (isError || !data) {
        return <div>{t("general:errorMessage")}</div>;
    }

    return (
        <BaseForm data={data} onValid={handleValid} onInvalid={handleInvalid} />
    );
}
