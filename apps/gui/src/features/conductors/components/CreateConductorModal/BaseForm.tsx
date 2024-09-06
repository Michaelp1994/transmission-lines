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
import type { ConductorFormInput } from "@repo/validators/forms/Conductor.schema";
import type { FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ButtonsWrapper, StyledForm } from "~/components/StyledForm";
import { ConductorTypeSelect } from "~/features/conductorTypes";
import { useCreateConductorForm } from "~/utils/forms";

interface BaseFormProps {
    onValid: (data: ConductorFormInput) => void;
    onInvalid: (errors: FieldErrors<ConductorFormInput>) => void;
}

export default function BaseForm({ onValid, onInvalid }: BaseFormProps) {
    const form = useCreateConductorForm();
    const { t } = useTranslation("createConductorModal");
    const submitHandler = form.handleSubmit(
        (data) => {
            onValid(data);
        },
        (errors) => {
            onInvalid(errors);
        }
    );

    return (
        <Form {...form}>
            <StyledForm onSubmit={submitHandler}>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => {
                        return (
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
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name="fromPhase"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>{t("fromPhase.label")}</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormDescription>
                                    {t("fromPhase.description")}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />

                <FormField
                    control={form.control}
                    name="toPhase"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>{t("toPhase.label")}</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormDescription>
                                    {t("toPhase.description")}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name="bundleNumber"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>{t("bundleNumber.label")}</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormDescription>
                                    {t("bundleNumber.description")}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name="bundleSpacing"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>
                                    {t("bundleSpacing.label")}
                                </FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormDescription>
                                    {t("bundleSpacing.description")}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name="isNeutral"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <div>
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div>
                                        <FormLabel>
                                            {t("isNeutral.label")}
                                        </FormLabel>
                                        <FormDescription>
                                            {t("isNeutral.description")}
                                        </FormDescription>
                                        <FormMessage />
                                    </div>
                                </div>
                            </FormItem>
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name="typeId"
                    render={({ field }) => {
                        return (
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
