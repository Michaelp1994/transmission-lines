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
import type { TransmissionLineFormInput } from "@repo/validators/forms";
import type { ProjectID } from "@repo/validators/Ids";
import type { FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ButtonsWrapper, StyledForm } from "~/components/StyledForm";
import { SourceSelect } from "~/features/sources";
import { useCreateTransmissionLineForm } from "~/utils/forms";

interface CreateTransmissionLineFormProps {
    projectId: ProjectID;
    onValid: (values: TransmissionLineFormInput) => void;
    onInvalid: (errors: FieldErrors<TransmissionLineFormInput>) => void;
}

export default function CreateTransmissionLineForm({
    projectId,
    onValid,
    onInvalid,
}: CreateTransmissionLineFormProps) {
    const { t } = useTranslation("createTransmissionLineForm");
    const form = useCreateTransmissionLineForm();

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
                                        projectId={projectId}
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
                                        projectId={projectId}
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
                    <Button variant="destructive" type="reset">
                        {t("form:reset")}
                    </Button>
                    <Button type="submit">{t("form:submit")}</Button>
                </ButtonsWrapper>
            </StyledForm>
        </Form>
    );
}
