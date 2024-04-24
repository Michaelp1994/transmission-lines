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
    UpdateTowerGeometryInput,
    updateTowerGeometrySchema,
} from "@repo/validators";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { ButtonsWrapper, StyledForm } from "~/components/StyledForm";
import toast from "~/utils/toast";
import trpc from "~/utils/trpc";

interface UpdateTowerGeometryFormProps {
    data: UpdateTowerGeometryInput;
}

export default function UpdateTowerGeometryForm({
    data,
}: UpdateTowerGeometryFormProps) {
    const navigate = useNavigate();
    const { t } = useTranslation("towerGeometry");

    const updateTowerGeometryMutation = trpc.towerGeometry.update.useMutation();
    const form = useForm<UpdateTowerGeometryInput>({
        resolver: zodResolver(updateTowerGeometrySchema),
        values: data || { name: "", id: "" },
    });

    async function onSubmit(values: UpdateTowerGeometryInput) {
        await updateTowerGeometryMutation.mutateAsync(values);
        if (updateTowerGeometryMutation.error) {
            console.log(updateTowerGeometryMutation.error);
            return;
        }
        toast.success(`${values.name} has been updated.`);
        navigate({ to: "/tower-geometries" });
    }
    return (
        <Form {...form}>
            <StyledForm
                onSubmit={form.handleSubmit(onSubmit)}
                onReset={() => form.reset()}
            >
                {" "}
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
                <ButtonsWrapper>
                    <Button type="submit">{t("form:submit")}</Button>
                </ButtonsWrapper>
            </StyledForm>
        </Form>
    );
}
