import { zodResolver } from "@hookform/resolvers/zod";
import { styled } from "@linaria/react";
import {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
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
    UpdateTransmissionLineInput,
    updateTransmissionLineSchema,
} from "@repo/validators/schemas/TransmissionLine.schema";
import { format } from "date-fns";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useTypedParams } from "react-router-typesafe-routes/dom";
import { toast } from "sonner";

import { SourceSelect } from "@/features/sources";
import ROUTES from "@/router/routes";
import trpc from "@/utils/trpc";

interface Props {}

const TransmissionLineGeneral: React.FC<Props> = () => {
    const { projectId, lineId } = useTypedParams(
        ROUTES.UPDATE_TRANSMISSION_LINE
    );

    const navigate = useNavigate();
    const { t } = useTranslation("transmissionLine");
    const { data } = trpc.transmissionLine.getById.useQuery({
        id: lineId,
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
        navigate(ROUTES.VIEW_PROJECT.buildPath({ projectId }));
    }
    return (
        <Wrapper>
            <Card>
                <Form {...form}>
                    <StyledForm
                        onSubmit={form.handleSubmit(onSubmit)}
                        onReset={() => form.reset()}
                    >
                        <CardHeader>
                            <CardHeaderText>
                                <CardTitle>General</CardTitle>
                                <CardDescription>
                                    General information about the transmission
                                    line.
                                </CardDescription>
                            </CardHeaderText>
                        </CardHeader>
                        <CardContent>
                            <FormContainer>
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                {t("name.label")}
                                            </FormLabel>
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
                            </FormContainer>
                        </CardContent>
                        <CardFooter className="border-t px-6 py-4">
                            <Button type="submit">Save</Button>
                        </CardFooter>
                    </StyledForm>
                </Form>
            </Card>
        </Wrapper>
    );
};

const Wrapper = styled.div``;
const StyledForm = styled.form``;
const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;
export default TransmissionLineGeneral;
