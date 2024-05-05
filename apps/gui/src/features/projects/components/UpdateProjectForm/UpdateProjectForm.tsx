import type { ProjectID } from "@repo/validators/Ids";
import { useNavigate } from "@tanstack/react-router";
import type { FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { TowerGeometryFormInput } from "@repo/validators/forms/TowerGeometry.schema";
import BaseForm from "./BaseForm";
import toast from "~/utils/toast";
import trpc from "~/utils/trpc";

interface UpdateProjectFormProps {
    projectId: ProjectID;
}

function handleInvalid(errors: FieldErrors<TowerGeometryFormInput>) {
    console.log(errors);
}

export default function FormWrapper({ projectId }: UpdateProjectFormProps) {
    const navigate = useNavigate();
    const { t } = useTranslation("updateProjectForm");

    const { data, isError, isLoading } = trpc.project.getById.useQuery({
        id: projectId,
    });

    const updateMutation = trpc.project.update.useMutation({
        async onSuccess(values) {
            toast.success(`${values.name} has been updated.`);
            await navigate({ to: "/projects" });
        },
        onError(error) {
            toast.error("Failed to update project");
            console.error(error);
        },
    });

    function handleValid(values: TowerGeometryFormInput) {
        updateMutation.mutate({ ...values, id: projectId });
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
