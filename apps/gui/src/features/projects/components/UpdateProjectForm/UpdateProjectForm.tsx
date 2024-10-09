import type { TowerGeometryFormInput } from "@repo/validators/forms/TowerGeometry.schema";

import { Button } from "@repo/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@repo/ui/form";
import { useForm } from "@repo/ui/hooks/use-form";
import { Input } from "@repo/ui/input";
import { projectFormSchema } from "@repo/validators/forms/Project.schema";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { ButtonsWrapper, StyledForm } from "~/components/StyledForm";
import toast from "@repo/ui/toast";
import trpc from "~/utils/trpc";

interface UpdateProjectFormProps {
    onFinish?: () => void;
}

export default function UpdateProjectForm({}: UpdateProjectFormProps) {
    const { t } = useTranslation("updateProjectForm");
    const navigate = useNavigate();
    const { data, isError, isLoading } = trpc.project.getCurrent.useQuery({});
    const form = useForm({
        schema: projectFormSchema,
        values: data,
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
        updateMutation.mutate(values);
    }

    if (isLoading) {
        return <div>{t("general:loading")}</div>;
    }
    if (isError || !data) {
        return <div>{t("general:errorMessage")}</div>;
    }

    return (
        <Form {...form}>
            <StyledForm
                onReset={() => {
                    form.reset();
                }}
                onSubmit={form.handleSubmit(handleValid)}
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>{t("name.label")}</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                    {t("name.description")}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <ButtonsWrapper>
                    <Button type="submit">{t("form:submit")}</Button>
                </ButtonsWrapper>
            </StyledForm>
        </Form>
    );
}
