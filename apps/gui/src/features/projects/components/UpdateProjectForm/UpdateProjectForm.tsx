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
import { format } from "date-fns";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import trpc from "~/utils/trpc";

interface UpdateProjectFormProps {
    data: UpdateTowerGeometryInput;
}

const UpdateProjectForm: React.FC<UpdateProjectFormProps> = ({ data }) => {
    const navigate = useNavigate();
    const { t } = useTranslation("projects");

    const updateMutation = trpc.project.update.useMutation();
    const form = useForm<UpdateTowerGeometryInput>({
        resolver: zodResolver(updateTowerGeometrySchema),
        values: data,
    });

    async function onSubmit(values: UpdateTowerGeometryInput) {
        await updateMutation.mutateAsync(values);
        toast.success(`${values.name} has been updated.`, {
            description: format(new Date(), "PPPPpp"),
        });
        navigate({ to: "/projects" });
    }

    return (
        <Wrapper>
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
                    <ButtonsContainer>
                        <Button type="submit">{t("form:submit")}</Button>
                    </ButtonsContainer>
                </StyledForm>
            </Form>
        </Wrapper>
    );
};
const Wrapper = styled.div``;

const StyledForm = styled.form``;
const ButtonsContainer = styled.div`
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
`;

export default UpdateProjectForm;
