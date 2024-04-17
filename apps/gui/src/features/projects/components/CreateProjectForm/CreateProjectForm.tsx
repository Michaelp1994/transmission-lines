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
    type CreateProjectInput,
    createProjectSchema,
    defaultProject,
} from "@repo/validators/schemas/Project.schema";
import { useNavigate } from "@tanstack/react-router";
import { format } from "date-fns";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import trpc from "~/utils/trpc";

interface Props {}

const CreateProjectForm: React.FC<Props> = () => {
    const { t } = useTranslation("source");
    const navigate = useNavigate();

    const createSourceMutation = trpc.project.create.useMutation({
        onSuccess(data, values) {
            toast.success(`${values.name} has been created`, {
                description: format(new Date(), "PPPPpp"),
            });
        },
        onError() {
            toast.error(`There is an error!`, {
                description: format(new Date(), "PPPPpp"),
            });
        },
    });

    const form = useForm<CreateProjectInput>({
        resolver: zodResolver(createProjectSchema),
        defaultValues: defaultProject,
    });

    async function onSubmit(values: CreateProjectInput) {
        await createSourceMutation.mutateAsync(values);
        navigate(ViewProjectPage.to);
    }
    return (
        <Wrapper>
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
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Name of the project
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
        </Wrapper>
    );
};

const Wrapper = styled.div``;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

const ButtonsWrapper = styled.div`
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
`;
export default CreateProjectForm;
