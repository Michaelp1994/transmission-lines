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
    CreateTransmissionLineInput,
    createTransmissionLineSchema,
    defaultTransmissionLine,
} from "@repo/validators";
import { ProjectID } from "@repo/validators/schemas/Ids.schema";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { ButtonsWrapper, StyledForm } from "~/components/StyledForm";
import { SourceSelect } from "~/features/sources";
import toast from "~/utils/toast";
import trpc from "~/utils/trpc";

interface CreateTransmissionLineFormProps {
    projectId: ProjectID;
}

export default function CreateTransmissionLineForm({
    projectId,
}: CreateTransmissionLineFormProps) {
    const { t } = useTranslation("transmissionLine");

    const navigate = useNavigate();
    const createTransmissionLineMutation =
        trpc.transmissionLine.create.useMutation();

    const form = useForm<CreateTransmissionLineInput>({
        resolver: zodResolver(createTransmissionLineSchema),
        values: {
            ...defaultTransmissionLine,
            projectId,
        },
    });

    async function onSubmit(values: CreateTransmissionLineInput) {
        const response =
            await createTransmissionLineMutation.mutateAsync(values);
        toast.success(`${values.name} has been added to the project.`);
        navigate({
            to: `/projects/$projectId/lines/$lineId`,
            params: { projectId, lineId: response.id },
        });
    }
    return (
        <Form {...form}>
            <StyledForm
                onSubmit={form.handleSubmit(onSubmit)}
                onReset={() => form.reset()}
            >
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
                                    projectId={projectId}
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
                                    projectId={projectId}
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
