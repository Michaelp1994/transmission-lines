import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { styled } from "@linaria/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";

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
import { toast } from "sonner";

import ConductorConfigurationTable from "../ConductorConfigurationTable";
import TowerConfigurationTable from "../TowerConfigurationTable";

import { SourceSelect } from "@/features/sources";
import ROUTES from "@/router/routes";
import {
    createTransmissionLineSchema,
    defaultTransmissionLine,
    CreateTransmissionLineInput,
} from "@repo/validators/schemas/TransmissionLine.schema";
import trpc from "@/utils/trpc";

interface Props {}

const AddTransmissionLineForm: React.FC<Props> = () => {
    const { t } = useTranslation("transmissionLine");
    const navigate = useNavigate();
    const createTransmissionLineMutation =
        trpc.transmissionLine.create.useMutation();

    const form = useForm<CreateTransmissionLineInput>({
        resolver: zodResolver(createTransmissionLineSchema),
        defaultValues: defaultTransmissionLine,
    });

    async function onSubmit(values: CreateTransmissionLineInput) {
        await createTransmissionLineMutation.mutateAsync(values);
        toast.success(`${values.name} has been added to the project.`, {
            description: format(new Date(), "PPPPpp"),
        });
        navigate(ROUTES.PROJECT.path);
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
                    name="fromSource"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("fromSource.label")}</FormLabel>
                            <FormControl>
                                <SourceSelect {...field} />
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
                    name="toSource"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("toSource.label")}</FormLabel>
                            <FormControl>
                                <SourceSelect {...field} />
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
                    <Button type="submit">{t("form:submit")}</Button>
                </ButtonsContainer>
            </StyledForm>
        </Form>
    );
};

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
export default AddTransmissionLineForm;
