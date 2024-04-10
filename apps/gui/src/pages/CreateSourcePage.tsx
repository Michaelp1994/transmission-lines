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
    NumberInput,
} from "@repo/ui";
import {
    CreateSourceInput,
    createSourceSchema,
    defaultSource,
} from "@repo/validators/schemas/Source.schema";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useTypedParams } from "react-router-typesafe-routes/dom";
import { toast } from "sonner";

import ROUTES from "@/router/routes";
import trpc from "@/utils/trpc";

interface Props {}

const CreateSourcePage: React.FC<Props> = () => {
    const { t } = useTranslation("source");
    const navigate = useNavigate();
    const { projectId } = useTypedParams(ROUTES.CREATE_SOURCE);
    const createSourceMutation = trpc.source.create.useMutation({
        onSuccess(_, values) {
            toast.success(`${values.name} has been added to the project.`, {
                description: format(new Date(), "PPPPpp"),
            });
            navigate(ROUTES.VIEW_PROJECT.buildPath({ projectId }));
        },
        onError(_, values) {
            toast.error(`There is an error!`, {
                description: format(new Date(), "PPPPpp"),
            });
        },
    });

    const form = useForm<CreateSourceInput>({
        resolver: zodResolver(createSourceSchema),
        // defaultValues: defaultSource,
        values: {
            ...defaultSource,
            projectId,
        },
    });

    async function onSubmit(values: CreateSourceInput) {
        await createSourceMutation.mutateAsync(values);
    }
    return (
        <PageWrapper>
            <Card>
                <CardHeader>
                    <CardHeaderText>
                        <CardTitle>{t("add.title")}</CardTitle>
                        <CardDescription>
                            {t("add.description")}
                        </CardDescription>
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
                                        <FormLabel>{t("name.label")}</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder={t(
                                                    "name.placeholder"
                                                )}
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
                                name="phases"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t("phases.label")}
                                        </FormLabel>
                                        <FormControl>
                                            <NumberInput
                                                type="number"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            {t("phases.description")}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="voltage"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t("voltage.label")}
                                        </FormLabel>
                                        <FormControl>
                                            <NumberInput
                                                type="number"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            {t("voltage.description")}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="x1r1"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t("x1r1.label")}</FormLabel>
                                        <FormControl>
                                            <NumberInput
                                                type="number"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            {t("x1r1.description")}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="x0r0"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t("x0r0.label")}</FormLabel>
                                        <FormControl>
                                            <NumberInput
                                                type="number"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            {t("x0r0.description")}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="isc3"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t("isc3.label")}</FormLabel>
                                        <FormControl>
                                            <NumberInput
                                                type="number"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            {t("isc3.description")}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="isc1"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t("isc1.label")}</FormLabel>
                                        <FormControl>
                                            <NumberInput
                                                type="number"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            {t("isc1.description")}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="resistance"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t("resistance.label")}
                                        </FormLabel>
                                        <FormControl>
                                            <NumberInput
                                                type="number"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            {t("resistance.description")}
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

export default CreateSourcePage;
