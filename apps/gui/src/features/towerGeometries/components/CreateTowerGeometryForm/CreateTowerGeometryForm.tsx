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
    CreateTowerGeometryInput,
    createTowerGeometrySchema,
    defaultTowerGeometry,
} from "@repo/validators";
import { useNavigate } from "@tanstack/react-router";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import trpc from "@/utils/trpc";

export default function CreateTowerGeometryForm() {
    const { t } = useTranslation("towerGeometry");
    const navigate = useNavigate();
    const createTowerGeometryMutation = trpc.towerGeometry.create.useMutation();
    const form = useForm<CreateTowerGeometryInput>({
        resolver: zodResolver(createTowerGeometrySchema),
        defaultValues: defaultTowerGeometry,
    });

    async function onSubmit(values: CreateTowerGeometryInput) {
        await createTowerGeometryMutation.mutateAsync(values);
        toast.success(`${values.name} has been added.`, {
            description: format(new Date(), "PPPPpp"),
        });
        navigate({ to: "/tower-geometries" });
    }
    return (
        <Form {...form}>
            <StyledForm
                onSubmit={form.handleSubmit(onSubmit)}
                onReset={() => form.reset()}
            >
                <LeftSide>
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
                        <Button variant="destructive" type="reset">
                            {t("form:reset")}
                        </Button>
                        <Button type="submit">{t("form:submit")}</Button>
                    </ButtonsContainer>
                </LeftSide>
                <RightSide>{/* <TowerGeometryDiagram /> */}</RightSide>
            </StyledForm>
        </Form>
    );
}
const StyledForm = styled.form`
    display: flex;
    gap: 2rem;
`;
const LeftSide = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 600px;
    gap: 2rem;
`;
const RightSide = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
`;

const ButtonsContainer = styled.div`
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
`;
