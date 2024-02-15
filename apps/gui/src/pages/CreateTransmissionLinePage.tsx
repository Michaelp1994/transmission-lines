import { zodResolver } from "@hookform/resolvers/zod";
import { styled } from "@linaria/react";
import {
    Button,
    Card,
    CardContent,
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
    CreateTransmissionLineInput,
    createTransmissionLineSchema,
    defaultTransmissionLine,
} from "@repo/validators/schemas/TransmissionLine.schema";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useTypedParams } from "react-router-typesafe-routes/dom";
import { toast } from "sonner";

import { SourceSelect } from "@/features/sources";
import {
    ConductorConfigurationTable,
    TowerConfigurationTable,
} from "@/features/transmissionLines";
import ROUTES from "@/router/routes";
import trpc from "@/utils/trpc";

interface Props {}

const CreateTransmissionLinePage: React.FC<Props> = () => {
    const { t } = useTranslation("transmissionLine");
    const { projectId } = useTypedParams(ROUTES.CREATE_TRANSMISSION_LINE);
    const navigate = useNavigate();
    const createTransmissionLineMutation =
        trpc.transmissionLine.create.useMutation();

    const form = useForm<CreateTransmissionLineInput>({
        resolver: zodResolver(createTransmissionLineSchema),
        // defaultValues: defaultTransmissionLine,
        values: {
            ...defaultTransmissionLine,
            projectId,
        },
    });

    async function onSubmit(values: CreateTransmissionLineInput) {
        await createTransmissionLineMutation.mutateAsync(values);
        toast.success(`${values.name} has been added to the project.`, {
            description: format(new Date(), "PPPPpp"),
        });
        navigate(ROUTES.VIEW_PROJECT.buildPath({ projectId }));
    }
    return (
        <Wrapper>
            <Link to={ROUTES.VIEW_PROJECT.buildPath({ projectId })}>
                {t("general:goBack")}
            </Link>
            <Card>
                <CardHeader>
                    <CardHeaderText>
                        <CardTitle>{t("add.title")}</CardTitle>
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
                                name="fromSourceId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t("fromSource.label")}
                                        </FormLabel>
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
                                        <FormLabel>
                                            {t("toSource.label")}
                                        </FormLabel>
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
                            <ConductorConfigurationTable />
                            <TowerConfigurationTable />
                            <ButtonsContainer>
                                <Button variant="destructive" type="reset">
                                    {t("form:reset")}
                                </Button>
                                <Button type="submit">
                                    {t("form:submit")}
                                </Button>
                            </ButtonsContainer>
                        </StyledForm>
                    </Form>
                </CardContent>
            </Card>
        </Wrapper>
    );
};

export default CreateTransmissionLinePage;

const Wrapper = styled.div`
    padding-bottom: 2rem;
`;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

const ButtonsContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
`;
