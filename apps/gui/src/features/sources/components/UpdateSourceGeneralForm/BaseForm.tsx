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
import { UpdateSourceGeneralFormInput } from "@repo/validators/forms/Source.schema";
import { FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { ButtonsWrapper, StyledForm } from "~/components/StyledForm";
import { useUpdateSourceGeneralForm } from "~/utils/forms";

interface UpdateSourceFormProps {
    data: UpdateSourceGeneralFormInput;
    onValid: (values: UpdateSourceGeneralFormInput) => void;
    onInvalid: (errors: FieldErrors<UpdateSourceGeneralFormInput>) => void;
}

export default function UpdateSourceForm({
    data,
    onValid,
    onInvalid,
}: UpdateSourceFormProps) {
    const { t } = useTranslation("updateSourceForm");

    const form = useUpdateSourceGeneralForm(data);

    const handleSubmit = form.handleSubmit(
        (values) => onValid(values),
        (errors) => onInvalid(errors)
    );

    return (
        <Form {...form}>
            <StyledForm onSubmit={handleSubmit} onReset={() => form.reset()}>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("name.label")}</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder={t("name.placeholder")}
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                {t("name.description")}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <ButtonsWrapper>
                    <Button
                        variant="destructive"
                        type="reset"
                        disabled={!form.formState.isDirty}
                    >
                        {t("form:reset")}
                    </Button>
                    <Button type="submit" disabled={!form.formState.isDirty}>
                        {t("form:submit")}
                    </Button>
                </ButtonsWrapper>
            </StyledForm>
        </Form>
    );
}
