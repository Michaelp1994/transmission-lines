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
import type { GenerateTowersFormInput } from "@repo/validators/forms/TransmissionTower.schema";
import type { FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ButtonsWrapper, StyledForm } from "~/components/StyledForm";
import { TowerGeometrySelect } from "~/features/towerGeometries";
import { useGenerateTowersForm } from "~/utils/forms";

interface BaseFormProps {
    onValid: (values: GenerateTowersFormInput) => void;
    onInvalid: (errors: FieldErrors<GenerateTowersFormInput>) => void;
}

export default function BaseForm({ onValid, onInvalid }: BaseFormProps) {
    const { t } = useTranslation("generateTowers");
    const form = useGenerateTowersForm();
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
                    name="namePrefix"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>{t("namePrefix.label")}</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                    {t("namePrefix.description")}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name="geometryId"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>{t("geometryId.label")}</FormLabel>
                                <FormControl>
                                    <TowerGeometrySelect {...field} />
                                </FormControl>
                                <FormDescription>
                                    {t("geometryId.description")}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name="numTowers"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>{t("numTowers.label")}</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormDescription>
                                    {t("numTowers.description")}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name="resistance"
                    render={({ field }) => {
                        return (
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
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name="distance"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>{t("distance.label")}</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormDescription>
                                    {t("distance.description")}
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
