import {
    Button,
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
} from "@repo/ui";
import type { ProjectFormInput } from "@repo/validators/forms";
import type { FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ButtonsWrapper, StyledForm } from "~/components/StyledForm";
import { useCreateProjectForm } from "~/utils/forms";

interface CreateProjectFormProps {
    onValid: (values: ProjectFormInput) => void;
    onInvalid: (error: FieldErrors<ProjectFormInput>) => void;
}

export default function BaseForm({
    onValid,
    onInvalid,
}: CreateProjectFormProps) {
    const { t } = useTranslation("createProjectForm");
    const form = useCreateProjectForm();

    const handleSubmit = form.handleSubmit(
        (values) => {
            onValid(values);
        },
        (error) => {
            onInvalid(error);
        }
    );

    return (
        <Form {...form}>
            <StyledForm
                onSubmit={handleSubmit}
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
