import { zodResolver } from "@hookform/resolvers/zod";
import { styled } from "@linaria/react";
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
import {
    UpdateConductorLocationInput,
    updateConductorLocationSchema,
} from "@repo/validators";
import { t } from "i18next";
import { useForm } from "react-hook-form";

import trpc from "~/utils/trpc";

interface UpdateConductorLocationFormProps {
    data: UpdateConductorLocationInput;
    onSubmit: () => void;
}

export default function UpdateConductorLocationForm({
    data,
    onSubmit,
}: UpdateConductorLocationFormProps) {
    const updateMutation = trpc.conductorLocations.update.useMutation();
    const utils = trpc.useUtils();

    const form = useForm<UpdateConductorLocationInput>({
        resolver: zodResolver(updateConductorLocationSchema),
        values: data,
    });

    const handleSubmit = form.handleSubmit(async (values) => {
        await updateMutation.mutateAsync(values);
        await utils.conductorLocations.getAllByGeometryId.invalidate({
            geometryId: values.geometryId,
        });
        onSubmit();
    });

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

                <Button type="submit">{t("form:update")}</Button>
            </StyledForm>
        </Form>
    );
}

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;
