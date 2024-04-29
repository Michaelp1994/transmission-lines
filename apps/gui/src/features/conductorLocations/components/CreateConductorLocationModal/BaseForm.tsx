import {
    Button,
    DialogFooter,
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
} from "@repo/ui";
import { ConductorLocationFormInput } from "@repo/validators/forms";
import { FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { StyledForm } from "~/components/StyledForm";
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
        (values) => onValid(values),
        (errors) => onInvalid(errors)
    );

    return (
        <Form {...form}>
            <StyledForm onSubmit={handleSubmit}>
                <FormField
                    control={form.control}
                    name="x"
                    render={({ field }) => (
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
                    )}
                />
                <FormField
                    control={form.control}
                    name="y"
                    render={({ field }) => (
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
                    )}
                />

                <DialogFooter>
                    <Button type="submit">{t("form:create")}</Button>
                </DialogFooter>
            </StyledForm>
        </Form>
    );
}
