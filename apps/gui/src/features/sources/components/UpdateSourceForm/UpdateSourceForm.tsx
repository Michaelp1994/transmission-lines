import { UpdateSourceInput } from "@repo/validators";
import { SourceID } from "@repo/validators/schemas/Ids.schema";
import { useNavigate } from "@tanstack/react-router";
import { format } from "date-fns";
import { FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import BaseForm from "./BaseForm";

import trpc from "~/utils/trpc";

interface FormHandlerProps {
    sourceId: SourceID;
}

export default function FormHandler({ sourceId }: FormHandlerProps) {
    const navigate = useNavigate();
    const { t } = useTranslation("source");

    const updateSourceMutation = trpc.source.update.useMutation();
    const { data, isLoading, error } = trpc.source.getById.useQuery({
        id: sourceId,
    });

    async function handleValid(values: UpdateSourceInput) {
        const result = await updateSourceMutation.mutateAsync(values);
        toast.success(`${values.name} has been updated.`, {
            description: format(new Date(), "PPPPpp"),
        });
        navigate({
            to: "/projects/$projectId/sources/",
            params: { projectId: result.projectId },
        });
    }

    async function handleInvalid(errors: FieldErrors<UpdateSourceInput>) {
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
