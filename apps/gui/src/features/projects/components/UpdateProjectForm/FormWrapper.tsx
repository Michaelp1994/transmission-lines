import type { UpdateTowerGeometryInput } from "@repo/validators";
import type { ProjectID } from "@repo/validators/Ids";
import { useNavigate } from "@tanstack/react-router";
import type { FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import BaseForm from "./BaseForm";
import toast from "~/utils/toast";
import trpc from "~/utils/trpc";

interface UpdateProjectFormProps {
    projectId: ProjectID;
}

export default function FormWrapper({ projectId }: UpdateProjectFormProps) {
    const navigate = useNavigate();
    const { t } = useTranslation("updateProjectForm");

    const { data, error, isLoading } = trpc.project.getById.useQuery({
        id: projectId,
    });

    const updateMutation = trpc.project.update.useMutation();

    async function handleValid(values: UpdateTowerGeometryInput) {
        await updateMutation.mutateAsync(values);
        toast.success(`${values.name} has been updated.`);
        navigate({ to: "/projects" });
    }

    async function handleInvalid(
        errors: FieldErrors<UpdateTowerGeometryInput>
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
