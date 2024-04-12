import { zodResolver } from "@hookform/resolvers/zod";
import { styled } from "@linaria/react";
import {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardHeaderText,
    CardTitle,
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
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import routes from "@/router/routes";
import trpc from "@/utils/trpc";

interface Props {}

const CreateProjectPage: React.FC<Props> = () => {
    const { t } = useTranslation("source");
    const navigate = useNavigate();

    const createSourceMutation = trpc.project.create.useMutation({
        onSuccess(data, values) {
            toast.success(`${values.name} has been created`, {
                description: format(new Date(), "PPPPpp"),
            });
            navigate(routes.projects.View.buildPath({ projectId: data.id }));
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
    }

    return (
        <PageWrapper>
            <Card>
                <CardHeader>
                    <CardHeaderText>
                        <CardTitle>Create Project</CardTitle>
                        <CardDescription>Create a new project</CardDescription>
                    </CardHeaderText>
                </CardHeader>
                <CardContent>
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
                                <Button type="submit">
                                    {t("form:submit")}
                                </Button>
                            </ButtonsWrapper>
                        </StyledForm>
                    </Form>
                </CardContent>
            </Card>
        </PageWrapper>
    );
};

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

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

export default CreateProjectPage;
