import { zodResolver } from "@hookform/resolvers/zod";
import { styled } from "@linaria/react";
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
import { UpdateSourceInput, updateSourceSchema } from "@repo/validators";
import { t } from "i18next";
import { FieldErrors, useForm } from "react-hook-form";

interface UpdateSourceFormProps {
    data: UpdateSourceInput;
    onValid: (values: UpdateSourceInput) => void;
    onInvalid: (errors: FieldErrors<UpdateSourceInput>) => void;
}

export default function UpdateSourceForm({
    data,
    onValid,
    onInvalid,
}: UpdateSourceFormProps) {
    const form = useForm<UpdateSourceInput>({
        resolver: zodResolver(updateSourceSchema),
        values: data,
    });

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
                    <Button variant="destructive" type="reset">
                        {t("form:reset")}
                    </Button>
                    <Button type="submit">{t("form:submit")}</Button>
                </ButtonsWrapper>
            </StyledForm>
        </Form>
    );
}

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;
const ButtonsWrapper = styled.div`
    display: flex;
    gap: 12px;
    justify-content: flex-end;
`;
