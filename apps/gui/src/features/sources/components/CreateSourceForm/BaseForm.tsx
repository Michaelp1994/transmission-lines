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
import type { SourceFormInput } from "@repo/validators/forms/Source.schema";
import type { FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ButtonsWrapper, StyledForm } from "~/components/StyledForm";
import { useCreateSourceForm } from "~/utils/forms";

interface CreateSourceFormProps {
    onValid: (values: SourceFormInput) => void;
    onInvalid: (errors: FieldErrors<SourceFormInput>) => void;
}

export default function CreateSourceForm({
    onValid,
    onInvalid,
}: CreateSourceFormProps) {
    const { t } = useTranslation("createSourceForm");

    const form = useCreateSourceForm();

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
                    name="enabled"
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
                                            {t("enabled.label")}
                                        </FormLabel>
                                        <FormDescription>
                                            {t("enabled.description")}
                                        </FormDescription>
                                    </div>

                                    <FormMessage />
                                </div>
                            </FormItem>
                        );
                    }}
                />
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
                    name="frequency"
                    render={({ field }) => {
                        return (
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
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name="voltage"
                    render={({ field }) => {
                        return (
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
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name="x1r1"
                    render={({ field }) => {
                        return (
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
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name="x0r0"
                    render={({ field }) => {
                        return (
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
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name="isc3"
                    render={({ field }) => {
                        return (
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
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name="isc1"
                    render={({ field }) => {
                        return (
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
