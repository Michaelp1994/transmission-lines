import {
    Button,
    Checkbox,
    DialogFooter,
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
    NumberInput,
} from "@repo/ui";
import { ConductorFormInput } from "@repo/validators/forms/Conductor.schema";
import { FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { StyledForm } from "~/components/StyledForm";
import { ConductorTypeSelect } from "~/features/conductorTypes";
import { useUpdateConductorForm } from "~/utils/forms";

interface BaseFormProps {
    data: ConductorFormInput;
    onValid: (values: ConductorFormInput) => void;
    onInvalid: (errors: FieldErrors<ConductorFormInput>) => void;
}

export default function BaseForm({ data, onValid, onInvalid }: BaseFormProps) {
    const form = useUpdateConductorForm(data);
    const { t } = useTranslation("updateConductorModal");
    const handleSubmit = form.handleSubmit(
        (values) => onValid(values),
        (errors) => onInvalid(errors)
    );
    return (
        <Form {...form}>
            <StyledForm onSubmit={handleSubmit}>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("name.label")}</FormLabel>
                            <FormControl>
                                <Input {...field} />
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
                    name="fromPhase"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("fromPhase.label")}</FormLabel>
                            <FormControl>
                                <NumberInput type="number" {...field} />
                            </FormControl>
                            <FormDescription>
                                {t("fromPhase.description")}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="toPhase"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("toPhase.label")}</FormLabel>
                            <FormControl>
                                <NumberInput type="number" {...field} />
                            </FormControl>
                            <FormDescription>
                                {t("toPhase.description")}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="bundleNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("bundleNumber.label")}</FormLabel>
                            <FormControl>
                                <NumberInput type="number" {...field} />
                            </FormControl>
                            <FormDescription>
                                {t("bundleNumber.description")}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="bundleSpacing"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("bundleSpacing.label")}</FormLabel>
                            <FormControl>
                                <NumberInput type="number" {...field} />
                            </FormControl>
                            <FormDescription>
                                {t("bundleSpacing.description")}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="isNeutral"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("isNeutral.label")}</FormLabel>
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <FormDescription>
                                {t("isNeutral.description")}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="typeId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("typeId.label")}</FormLabel>
                            <FormControl>
                                <ConductorTypeSelect {...field} />
                            </FormControl>
                            <FormDescription>
                                {t("typeId.description")}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <DialogFooter>
                    <Button type="submit">{t("form:update")}</Button>
                </DialogFooter>
            </StyledForm>
        </Form>
    );
}