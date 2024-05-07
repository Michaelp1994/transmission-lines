import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    Input,
    FormDescription,
    FormMessage,
    Button,
} from "@repo/ui";
import type { TransmissionLineFormInput } from "@repo/validators/forms/TransmissionLine.schema";
import type { FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyledForm, ButtonsWrapper } from "~/components/StyledForm";
import { SourceSelect } from "~/features/sources";
import { useUpdateTransmissionLineForm } from "~/utils/forms";
import type { RouterOutputs } from "~/utils/trpc";

interface BaseFormProps {
    data: RouterOutputs["transmissionLine"]["getById"];
    onValid: (values: TransmissionLineFormInput) => void;
    onInvalid: (errors: FieldErrors<TransmissionLineFormInput>) => void;
}

export default function BaseForm({ onValid, onInvalid, data }: BaseFormProps) {
    const { t } = useTranslation("transmissionLine");
    const form = useUpdateTransmissionLineForm(data);

    const handleSubmit = form.handleSubmit(
        (values) => {
            onValid(values);
        },
        (errors) => {
            onInvalid(errors);
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
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name="fromSourceId"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>{t("fromSource.label")}</FormLabel>
                                <FormControl>
                                    <SourceSelect
                                        projectId={data.projectId}
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    {t("fromSource.description")}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name="toSourceId"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>{t("toSource.label")}</FormLabel>
                                <FormControl>
                                    <SourceSelect
                                        projectId={data.projectId}
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    {t("toSource.description")}
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
