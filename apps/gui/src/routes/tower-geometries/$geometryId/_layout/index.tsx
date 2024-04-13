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
    UpdateTowerGeometryInput,
    updateTowerGeometrySchema,
} from "@repo/validators";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { format } from "date-fns";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import trpc from "@/utils/trpc";

interface TowerGeometryGeneralProps {}

export const TowerGeometryGeneral: React.FC<TowerGeometryGeneralProps> = () => {
    const navigate = useNavigate();
    const { t } = useTranslation("towerGeometry");
    const { geometryId } = Route.useParams();
    const { data, error, isLoading } = trpc.towerGeometry.getById.useQuery({
        id: geometryId,
    });

    const updateTowerGeometryMutation = trpc.towerGeometry.update.useMutation();
    const form = useForm<UpdateTowerGeometryInput>({
        resolver: zodResolver(updateTowerGeometrySchema),
        values: data || { name: "", id: "" },
    });

    if (isLoading) {
        return <div>{t("general:loading")}</div>;
    }
    if (error || !data) {
        return <div>{t("general:errorMessage")}</div>;
    }

    async function onSubmit(values: UpdateTowerGeometryInput) {
        await updateTowerGeometryMutation.mutateAsync(values);
        if (updateTowerGeometryMutation.error) {
            console.log(updateTowerGeometryMutation.error);
            return;
        }
        toast.success(`${values.name} has been updated.`, {
            description: format(new Date(), "PPPPpp"),
        });
        navigate({ to: "/tower-geometries" });
    }
    return (
        <Wrapper>
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
                            {" "}
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
const StyledForm = styled.form``;
const ButtonsContainer = styled.div`
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
`;

export const Route = createFileRoute("/tower-geometries/$geometryId/_layout/")({
    component: TowerGeometryGeneral,
    beforeLoad: () => ({
        text: "TowerGeometryGeneral",
    }),
});
