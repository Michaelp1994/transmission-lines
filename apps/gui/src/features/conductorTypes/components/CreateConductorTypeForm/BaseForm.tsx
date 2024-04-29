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
    NumberInput,
} from "@repo/ui";
import { ConductorTypeFormInput } from "@repo/validators/forms";
import { FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { ButtonsWrapper, StyledForm } from "~/components/StyledForm";
import { useCreateConductorTypeForm } from "~/utils/forms";

interface BaseFromProps {
    onValid: (values: ConductorTypeFormInput) => void;
    onInvalid: (errors: FieldErrors<ConductorTypeFormInput>) => void;
}

export default function BaseForm({ onValid, onInvalid }: BaseFromProps) {
    const { t } = useTranslation("conductorType");
    const form = useCreateConductorTypeForm();

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
                    name="surfaceArea"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("surfaceArea.label")}</FormLabel>
                            <FormControl>
                                <NumberInput type="number" {...field} />
                            </FormControl>
                            <FormDescription>
                                {t("surfaceArea.description")}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="outerDiameter"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("outerDiameter.label")}</FormLabel>
                            <FormControl>
                                <NumberInput type="number" {...field} />
                            </FormControl>
                            <FormDescription>
                                {t("outerDiameter.description")}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="coreDiameter"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("coreDiameter.label")}</FormLabel>
                            <FormControl>
                                <NumberInput type="number" {...field} />
                            </FormControl>
                            <FormDescription>
                                {t("coreDiameter.description")}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="stranding"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("stranding.label")}</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription>
                                {t("stranding.description")}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="layers"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("layers.label")}</FormLabel>
                            <FormControl>
                                <NumberInput type="number" {...field} />
                            </FormControl>
                            <FormDescription>
                                {t("layers.description")}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="currentCapacity"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("currentCapacity.label")}</FormLabel>
                            <FormControl>
                                <NumberInput type="number" {...field} />
                            </FormControl>
                            <FormDescription>
                                {t("currentCapacity.description")}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="dcResistance25"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("dcResistance25.label")}</FormLabel>
                            <FormControl>
                                <NumberInput type="number" {...field} />
                            </FormControl>
                            <FormDescription>
                                {t("dcResistance25.description")}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="acResistance25"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("acResistance25.label")}</FormLabel>
                            <FormControl>
                                <NumberInput type="number" {...field} />
                            </FormControl>
                            <FormDescription>
                                {t("acResistance25.description")}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="acResistance50"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("acResistance50.label")}</FormLabel>
                            <FormControl>
                                <NumberInput type="number" {...field} />
                            </FormControl>
                            <FormDescription>
                                {t("acResistance50.description")}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="acResistance75"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("acResistance75.label")}</FormLabel>
                            <FormControl>
                                <NumberInput type="number" {...field} />
                            </FormControl>
                            <FormDescription>
                                {t("acResistance75.description")}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="gmr"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("gmr.label")}</FormLabel>
                            <FormControl>
                                <NumberInput type="number" {...field} />
                            </FormControl>
                            <FormDescription>
                                {t("gmr.description")}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <ButtonsWrapper>
                    <Button type="submit">{t("form:submit")}</Button>
                </ButtonsWrapper>
            </StyledForm>
        </Form>
    );
}