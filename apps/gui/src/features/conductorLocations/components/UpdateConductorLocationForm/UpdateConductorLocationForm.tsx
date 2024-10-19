import type { UpdateConductorLocationInput } from "@repo/validators";
import type { FieldErrors } from "react-hook-form";

import { Button } from "@repo/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@repo/ui/form";
import { useForm } from "@repo/ui/hooks/use-form";
import { Input } from "@repo/ui/input";
import toast from "@repo/ui/toast";
import {
    type ConductorLocationFormInput,
    conductorLocationFormSchema,
} from "@repo/validators/forms/ConductorLocation.schema";
import { useTranslation } from "react-i18next";

import { StyledForm } from "~/components/StyledForm";
import trpc from "~/utils/trpc";

interface FormHandlerProps {
    conductorLocationId: number;
    onFinish?: () => void;
}

export default function FormHandler({
    conductorLocationId,
    onFinish,
}: FormHandlerProps) {
    const utils = trpc.useUtils();
    const { data, isError, isLoading } =
        trpc.conductorLocations.getById.useQuery({
            locationId: conductorLocationId,
        });

    const form = useForm({
        schema: conductorLocationFormSchema,
        values: data,
    });

    const { t } = useTranslation("updateConductorLocationForm");
    const updateMutation = trpc.conductorLocations.update.useMutation({
        async onSuccess(values) {
            toast.success("Conductor location updated");
            await utils.conductorLocations.getAllByGeometryId.invalidate({
                geometryId: values.geometryId,
            });
            if (onFinish) onFinish();
        },
        onError(error) {
            toast.error("Conductor location not updated");
            console.log(error);
        },
    });

    function handleValid(values: ConductorLocationFormInput) {
        updateMutation.mutate({
            ...values,
            id: conductorLocationId,
        });
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <div>Error</div>;
    }

    return (
        <Form {...form}>
            <StyledForm
                aria-label="updateConductorLocation"
                onSubmit={form.handleSubmit(handleValid)}
            >
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

                <Button type="submit">{t("form:submit")}</Button>
            </StyledForm>
        </Form>
    );
}
