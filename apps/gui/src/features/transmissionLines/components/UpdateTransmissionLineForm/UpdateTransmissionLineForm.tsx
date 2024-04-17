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
    UpdateTransmissionLineInput,
    updateTransmissionLineSchema,
} from "@repo/validators";
import { useNavigate } from "@tanstack/react-router";
import { format } from "date-fns";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { SourceSelect } from "~/features/sources";
import trpc from "~/utils/trpc";

interface UpdateTransmissionLineFormProps {
    data: UpdateTransmissionLineInput;
}

const UpdateTransmissionLineForm: React.FC<UpdateTransmissionLineFormProps> = ({
    data,
}) => {
    const navigate = useNavigate();
    const { t } = useTranslation("transmissionLine");

    const updateTransmissionLineMutation =
        trpc.transmissionLine.update.useMutation();

    const form = useForm<UpdateTransmissionLineInput>({
        resolver: zodResolver(updateTransmissionLineSchema),
        values: data,
    });

    async function onSubmit(values: UpdateTransmissionLineInput) {
        await updateTransmissionLineMutation.mutateAsync(values);

        toast.success(`${values.name} has been updated.`, {
            description: format(new Date(), "PPPPpp"),
        });
        navigate({
            to: "/projects/$projectId",
            params: { projectId: values.projectId },
        });
    }
    return (
        <Form {...form}>
            <StyledForm
                onSubmit={form.handleSubmit(onSubmit)}
                onReset={() => form.reset()}
            >
                <FormContainer>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
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
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="fromSourceId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t("fromSource.label")}</FormLabel>
                                <FormControl>
                                    <SourceSelect
                                        projectId={data.projectId}
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    {t("fromSource.description")}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="toSourceId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t("toSource.label")}</FormLabel>
                                <FormControl>
                                    <SourceSelect
                                        projectId={data.projectId}
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    {t("toSource.description")}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </FormContainer>
                <Button type="submit">Save</Button>
            </StyledForm>
        </Form>
    );
};

const StyledForm = styled.form``;
const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;
export default UpdateTransmissionLineForm;
