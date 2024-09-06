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
import type { GenerateConductorsFormInput } from "@repo/validators/forms/Conductor.schema";
import type { FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ButtonsWrapper, StyledForm } from "~/components/StyledForm";
import { ConductorTypeSelect } from "~/features/conductorTypes";
import { useGenerateConductorsForm } from "~/utils/forms";

interface BaseFormProps {
    onValid: (values: GenerateConductorsFormInput) => void;
    onInvalid: (error: FieldErrors<GenerateConductorsFormInput>) => void;
}

export default function BaseForm({ onValid, onInvalid }: BaseFormProps) {
    const { t } = useTranslation("generateConductors");
    const form = useGenerateConductorsForm();
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
            <StyledForm onSubmit={handleSubmit}>
                <FormField
                    control={form.control}
                    name="phases"
                    render={({ field }) => {
                        return (
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
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name="circuits"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>{t("circuits.label")}</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormDescription>
                                    {t("circuits.description")}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />

                <FormField
                    control={form.control}
                    name="neutrals"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>{t("neutrals.label")}</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormDescription>
                                    {t("neutrals.description")}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name="phaseTypeId"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>
                                    {t("phaseConductorType.label")}
                                </FormLabel>
                                <FormControl>
                                    <ConductorTypeSelect {...field} />
                                </FormControl>
                                <FormDescription>
                                    {t("phaseConductorType.description")}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name="neutralTypeId"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>
                                    {t("neutralConductorType.label")}
                                </FormLabel>
                                <FormControl>
                                    <ConductorTypeSelect {...field} />
                                </FormControl>
                                <FormDescription>
                                    {t("neutralConductorType.description")}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <ButtonsWrapper>
                    <Button type="submit">{t("form:generate")}</Button>
                </ButtonsWrapper>
            </StyledForm>
        </Form>
    );
}
