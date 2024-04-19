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
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface CreateProjectFormProps {
    onSubmit: (values: CreateProjectInput) => Promise<void>;
}

export default function CreateProjectForm({
    onSubmit,
}: CreateProjectFormProps) {
    const { t } = useTranslation("createProjectForm");

    const form = useForm<CreateProjectInput>({
        resolver: zodResolver(createProjectSchema),
        defaultValues: defaultProject,
    });

    return (
        <Form {...form}>
            <StyledForm
                onSubmit={form.handleSubmit((values) => onSubmit(values))}
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
    );
}

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
