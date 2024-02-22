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
    NumberInput,
} from "@repo/ui";
import {
    UpdateConductorTypeInput,
    defaultConductorType,
    updateConductorTypeSchema,
} from "@repo/validators/schemas/ConductorType.schema";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useTypedParams } from "react-router-typesafe-routes/dom";
import { toast } from "sonner";

import ROUTES from "@/router/routes";
import trpc from "@/utils/trpc";

interface Props {}

const UpdateConductorTypePage: React.FC<Props> = () => {
    const { id } = useTypedParams(ROUTES.UPDATE_CONDUCTOR_TYPE);
    const { t } = useTranslation("conductorType");
    const navigate = useNavigate();

    const { data, isLoading, error } = trpc.conductorType.getById.useQuery({
        id,
    });
    const updateConductorTypeMutation = trpc.conductorType.update.useMutation();

    const form = useForm<UpdateConductorTypeInput>({
        resolver: zodResolver(updateConductorTypeSchema),
        defaultValues: defaultConductorType,
        values: data,
    });

    async function onSubmit(values: UpdateConductorTypeInput) {
        await updateConductorTypeMutation.mutate(values);
        if (updateConductorTypeMutation.error) {
            console.log(updateConductorTypeMutation.error);
            return;
        }
        toast.success(`${values.name} has been updated.`, {
            description: format(new Date(), "PPPPpp"),
        });
        navigate(ROUTES.ALL_CONDUCTOR_TYPES.path);
    }

    if (isLoading) {
        return <div>{t("general:loading")}</div>;
    }
    if (error || !data) {
        return <div>{t("general:errorMessage")}</div>;
    }
    return (
        <Wrapper>
            <Link to={ROUTES.ALL_CONDUCTOR_TYPES.path}>
                {t("general:goBack")}
            </Link>

            <Card>
                <CardHeader>
                    <CardHeaderText>
                        <CardTitle>{t("edit.title")}</CardTitle>
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
                                            <Input {...field} />
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
                                name="surfaceArea"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t("surfaceArea.label")}
                                        </FormLabel>
                                        <FormControl>
                                            <NumberInput
                                                type="number"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            {t("surfaceArea.description")}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="outerDiameter"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t("outerDiameter.label")}
                                        </FormLabel>
                                        <FormControl>
                                            <NumberInput
                                                type="number"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            {t("outerDiameter.description")}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="coreDiameter"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t("coreDiameter.label")}
                                        </FormLabel>
                                        <FormControl>
                                            <NumberInput
                                                type="number"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            {t("coreDiameter.description")}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="stranding"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t("stranding.label")}
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            {t("stranding.description")}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="layers"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t("layers.label")}
                                        </FormLabel>
                                        <FormControl>
                                            <NumberInput
                                                type="number"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            {t("layers.description")}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="currentCapacity"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t("currentCapacity.label")}
                                        </FormLabel>
                                        <FormControl>
                                            <NumberInput
                                                type="number"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            {t("currentCapacity.description")}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="dcResistance25"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t("dcResistance25.label")}
                                        </FormLabel>
                                        <FormControl>
                                            <NumberInput
                                                type="number"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            {t("dcResistance25.description")}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="acResistance25"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t("acResistance25.label")}
                                        </FormLabel>
                                        <FormControl>
                                            <NumberInput
                                                type="number"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            {t("acResistance25.description")}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="acResistance50"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t("acResistance50.label")}
                                        </FormLabel>
                                        <FormControl>
                                            <NumberInput
                                                type="number"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            {t("acResistance50.description")}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="acResistance75"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t("acResistance75.label")}
                                        </FormLabel>
                                        <FormControl>
                                            <NumberInput
                                                type="number"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            {t("acResistance75.description")}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="gmr"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t("gmr.label")}</FormLabel>
                                        <FormControl>
                                            <NumberInput
                                                type="number"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            {t("gmr.description")}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <ButtonsContainer>
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

const Wrapper = styled.div``;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
    margin-bottom: 2rem;
    gap: 2rem;
`;

const ButtonsContainer = styled.div`
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
`;
export default UpdateConductorTypePage;
