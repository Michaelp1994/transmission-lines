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
    NumberInput,
} from "@repo/ui";
import { UpdateSourceInput, updateSourceSchema } from "@repo/validators";
import { useNavigate } from "@tanstack/react-router";
import { format } from "date-fns";
import { t } from "i18next";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import trpc from "~/utils/trpc";

interface UpdateSourceFormProps {
    data: UpdateSourceInput;
}

const UpdateSourceForm: React.FC<UpdateSourceFormProps> = ({ data }) => {
    const navigate = useNavigate();
    const updateSourceMutation = trpc.source.update.useMutation();
    const form = useForm<UpdateSourceInput>({
        resolver: zodResolver(updateSourceSchema),
        values: data,
    });

    async function onSubmit(values: UpdateSourceInput) {
        const result = await updateSourceMutation.mutateAsync(values);
        toast.success(`${values.name} has been updated.`, {
            description: format(new Date(), "PPPPpp"),
        });
        navigate({
            to: "/projects/$projectId/sources/",
            params: { projectId: result.projectId },
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

                <ButtonsWrapper>
                    <Button variant="destructive" type="reset">
                        {t("form:reset")}
                    </Button>
                    <Button type="submit">{t("form:submit")}</Button>
                </ButtonsWrapper>
            </StyledForm>
        </Form>
    );
};

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;
const ButtonsWrapper = styled.div`
    display: flex;
    gap: 12px;
    justify-content: flex-end;
`;

export default UpdateSourceForm;
