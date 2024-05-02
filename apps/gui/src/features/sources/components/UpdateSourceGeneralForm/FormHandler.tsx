import type { UpdateSourceGeneralFormInput } from "@repo/validators/forms/Source.schema";
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

export default function FormHandler({ sourceId }: FormHandlerProps) {
    const navigate = useNavigate();
    const { t } = useTranslation("source");

    const updateSourceMutation = trpc.source.updateGeneral.useMutation();
    const { data, isLoading, error } = trpc.source.getById.useQuery({
        id: sourceId,
    });

    async function handleValid(values: UpdateSourceGeneralFormInput) {
        const result = await updateSourceMutation.mutateAsync({
            ...values,
            id: sourceId,
        });

        toast.success(`${result.name} has been updated.`);
        navigate({
            to: "/projects/$projectId/sources",
            params: { projectId: result.projectId },
        });
    }

    async function handleInvalid(
        errors: FieldErrors<UpdateSourceGeneralFormInput>
    ) {
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
