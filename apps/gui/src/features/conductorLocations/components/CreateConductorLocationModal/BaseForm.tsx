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
import type { ConductorLocationFormInput } from "@repo/validators/forms";
import type { FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ButtonsWrapper, StyledForm } from "~/components/StyledForm";
import { useCreateConductorLocationForm } from "~/utils/forms";

interface CreateConductorLocationFormProps {
    onValid: (values: ConductorLocationFormInput) => void;
    onInvalid: (errors: FieldErrors<ConductorLocationFormInput>) => void;
}

export default function CreateConductorLocationForm({
    onValid,
    onInvalid,
}: CreateConductorLocationFormProps) {
    const { t } = useTranslation("createConductorLocationModal");
    const form = useCreateConductorLocationForm();

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
            <StyledForm onSubmit={handleSubmit}>
                <FormField
                    control={form.control}
                    name="x"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>{t("x.label")}</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormDescription>
                                    {t("x.description")}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name="y"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>{t("y.label")}</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormDescription>
                                    {t("y.description")}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <ButtonsWrapper>
                    <Button type="submit">{t("form:create")}</Button>
                </ButtonsWrapper>
            </StyledForm>
        </Form>
    );
}
