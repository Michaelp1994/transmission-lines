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
import {
    defaultProject,
    type ProjectFormInput,
    projectFormSchema,
} from "@repo/validators/forms";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { ButtonsWrapper, StyledForm } from "~/components/StyledForm";
import toast from "@repo/ui/toast";
import trpc from "~/utils/trpc";

interface CreateProjectFormProps {
    onFinish?: () => void;
}

export default function CreateProjectForm({
    onFinish,
}: CreateProjectFormProps) {
    const navigate = useNavigate();
    const { t } = useTranslation("createProjectForm");
    const form = useForm({
        schema: projectFormSchema,
        defaultValues: defaultProject,
    });

    function handleValid(values: ProjectFormInput) {
        createMutation.mutateAsync(values);
    }

    const createMutation = trpc.project.create.useMutation({
        async onSuccess(data) {
            toast.success(`${data.name} has been created.`);
            await navigate({
                to: "/project/diagram",
            });
            if (onFinish) onFinish();
        },
        onError(error) {
            toast.error(`Can't create project`);
            console.log(error);
        },
    });

    return (
        <Form {...form}>
            <StyledForm
                onReset={() => {
                    form.reset();
                }}
                onSubmit={(e) => void form.handleSubmit(handleValid)(e)}
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>{t("name.label")}</FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
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
                    <Button type="reset" variant="destructive">
                        {t("form:reset")}
                    </Button>
                    <Button type="submit">{t("form:submit")}</Button>
                </ButtonsWrapper>
            </StyledForm>
        </Form>
    );
}
