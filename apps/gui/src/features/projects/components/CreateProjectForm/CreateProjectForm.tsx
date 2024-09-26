import { useNavigate } from "@tanstack/react-router";
import toast from "~/utils/toast";
import trpc from "~/utils/trpc";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@repo/ui/form";
import { Input } from "@repo/ui/input";
import { Button } from "@repo/ui/button";
import {
    defaultProject,
    projectFormSchema,
    type ProjectFormInput,
} from "@repo/validators/forms";
import { useTranslation } from "react-i18next";
import { ButtonsWrapper, StyledForm } from "~/components/StyledForm";
import { useForm } from "@repo/ui/hooks/use-form";

export default function CreateProjectForm() {
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
                to: "/projects/$projectId",
                params: {
                    projectId: data.id,
                },
            });
        },
        onError(error) {
            toast.error(`Can't create project`);
            console.log("Error", error);
        },
    });

    return (
        <Form {...form}>
            <StyledForm
                onSubmit={(e) => void form.handleSubmit(handleValid)(e)}
                onReset={() => {
                    form.reset();
                }}
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
                    <Button variant="destructive" type="reset">
                        {t("form:reset")}
                    </Button>
                    <Button type="submit">{t("form:submit")}</Button>
                </ButtonsWrapper>
            </StyledForm>
        </Form>
    );
}
