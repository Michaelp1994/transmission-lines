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
    TransmissionLineInfoInput,
    defaultTransmissionLineInfo,
    transmissionLineInfoSchema,
} from "@repo/validators/schemas/TransmissionLine.schema";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useTypedParams } from "react-router-typesafe-routes/dom";
import { toast } from "sonner";

import { SourceSelect } from "@/features/sources";
import ROUTES from "@/router/routes";
import trpc from "@/utils/trpc";

interface Props {}

const TransmissionLineInfo: React.FC<Props> = () => {
    const { id } = useTypedParams(ROUTES.UPDATE_TRANSMISSION_LINE);
    const navigate = useNavigate();

    const { t } = useTranslation("transmissionLine");
    const { data } = trpc.transmissionLine.getById.useQuery(id);

    const { mutateAsync, isLoading } = trpc.transmissionLine.getAll.useMutation(
        {
            onSuccess: (_data, { transmissionLine }) => {
                toast.success(`${transmissionLine.name} has been updated.`, {
                    description: format(new Date(), "PPPPpp"),
                });
                navigate(ROUTES.PROJECT.path);
            },
            onError: () => {
                //
                toast.warning(`There is an error.`, {
                    description: format(new Date(), "PPPPpp"),
                });
            },
        }
    );

    const form = useForm<TransmissionLineInfoInput>({
        resolver: zodResolver(transmissionLineInfoSchema),
        defaultValues: defaultTransmissionLineInfo,
        values: data,
    });

    async function onSubmit(values: TransmissionLineInfoInput) {
        await mutateAsync({
            id,
            transmissionLine: values,
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
                <ButtonContainer>
                    <Button type="submit" disabled={isLoading}>
                        {t("form:submit")}
                    </Button>
                </ButtonContainer>
            </StyledForm>
        </Form>
    );
};

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-top: 2rem;
`;

const ButtonContainer = styled.div``;

export default TransmissionLineInfo;
