import { zodResolver } from "@hookform/resolvers/zod";
import { styled } from "@linaria/react";
import {
    Button,
    Checkbox,
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
} from "@repo/ui";
import {
    CreateSourceFormInput,
    createSourceFormSchema,
    defaultSource,
} from "@repo/validators/forms/Source.schema";
import { FieldErrors, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { StyledForm } from "~/components/StyledForm";

interface CreateSourceFormProps {
    onValid: (values: CreateSourceFormInput) => void;
    onInvalid: (errors: FieldErrors<CreateSourceFormInput>) => void;
}

export default function CreateSourceForm({
    onValid,
    onInvalid,
}: CreateSourceFormProps) {
    const { t } = useTranslation("createSourceForm");

    const form = useForm<CreateSourceFormInput>({
        resolver: zodResolver(createSourceFormSchema),
        values: defaultSource,
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
                <FormField
                    control={form.control}
                    name="enabled"
                    render={({ field }) => (
                        <FormItem>
                            <CheckboxWrapper>
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <CheckboxText>
                                    <FormLabel>{t("enabled.label")}</FormLabel>
                                    <FormDescription>
                                        {t("enabled.description")}
                                    </FormDescription>
                                </CheckboxText>

                                <FormMessage />
                            </CheckboxWrapper>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phases"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("phases.label")}</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} />
                            </FormControl>
                            <FormDescription>
                                {t("phases.description")}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="frequency"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("frequency.label")}</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} />
                            </FormControl>
                            <FormDescription>
                                {t("frequency.description")}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="voltage"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("voltage.label")}</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} />
                            </FormControl>
                            <FormDescription>
                                {t("voltage.description")}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="x1r1"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("x1r1.label")}</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} />
                            </FormControl>
                            <FormDescription>
                                {t("x1r1.description")}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="x0r0"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("x0r0.label")}</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} />
                            </FormControl>
                            <FormDescription>
                                {t("x0r0.description")}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="isc3"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("isc3.label")}</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} />
                            </FormControl>
                            <FormDescription>
                                {t("isc3.description")}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="isc1"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("isc1.label")}</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} />
                            </FormControl>
                            <FormDescription>
                                {t("isc1.description")}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="resistance"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("resistance.label")}</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} />
                            </FormControl>
                            <FormDescription>
                                {t("resistance.description")}
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

const ButtonsWrapper = styled.div`
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
`;

const CheckboxWrapper = styled.div`
    display: flex;
    padding: 1rem;
    margin-top: 0.25rem;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    border-radius: 0.375rem;
    border-width: 1px;
`;

const CheckboxText = styled.div`
    /* margin-top: 0.25rem; */
    margin-left: 0.75rem;
    line-height: 1;
`;
