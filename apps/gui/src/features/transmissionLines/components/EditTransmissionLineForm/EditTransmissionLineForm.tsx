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
    UpdateTransmissionLineInput,
    updateTransmissionLineSchema,
} from "@repo/validators/schemas/TransmissionLine.schema";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { SourceSelect } from "@/features/sources";
import ROUTES from "@/router/routes";
import trpc from "@/utils/trpc";


import ConductorConfigurationTable from "../ConductorConfigurationTable";
import TowerConfigurationTable from "../TowerConfigurationTable";

interface Props {
    id: string;
}

const EditTransmissionLineForm: React.FC<Props> = ({ id }) => {
    const navigate = useNavigate();
    const { t } = useTranslation("transmissionLine");
    const { data, isLoading, error } = trpc.transmissionLine.getById.useQuery({
        id,
    });
    const updateTransmissionLineMutation =
        trpc.transmissionLine.update.useMutation();
    const form = useForm<UpdateTransmissionLineInput>({
        resolver: zodResolver(updateTransmissionLineSchema),
        values: data,
    });

    async function onSubmit(values: UpdateTransmissionLineInput) {
        await updateTransmissionLineMutation.mutateAsync(values);

        toast.success(`${values.name} has been updated.`, {
            description: format(new Date(), "PPPPpp"),
        });
        navigate(ROUTES.PROJECT.path);
    }

    if (!data) {
        return <div>{t("general:errorMessage")}</div>;
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
                {JSON.stringify(form.formState.errors)}
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
export default EditTransmissionLineForm;
