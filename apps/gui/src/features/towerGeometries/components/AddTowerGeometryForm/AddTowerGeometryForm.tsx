import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ROUTES from "@/router/routes";
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

import ConductorLocationTable from "../ConductorLocationTable";
import TowerGeometryDiagram from "../TowerGeometryDiagram";
import {
    TowerGeometryInput,
    towerGeometryInputSchema,
    defaultTowerGeometry,
} from "@repo/validators/schemas/TowerGeometry.schema";
import { toast } from "sonner";
import { format } from "date-fns";
import trpc from "@/utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {}

const AddTowerGeometryForm: React.FC<Props> = () => {
    const navigate = useNavigate();
    const { t } = useTranslation("towerGeometry");
    const createTowerGeometryMutation = trpc.towerGeometry.create.useMutation();
    const form = useForm<TowerGeometryInput>({
        resolver: zodResolver(towerGeometryInputSchema),
        defaultValues: defaultTowerGeometry,
    });

    async function onSubmit(values: TowerGeometryInput) {
        try {
            await createTowerGeometryMutation.mutateAsync(values);
            toast.success(`${values.name} has been added.`, {
                description: format(new Date(), "PPPPpp"),
            });
            navigate(ROUTES.TOWER_GEOMETRIES.path);
        } catch (e) {
            console.log(e);
            toast.error("There was an error");
        }
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
                    <ConductorLocationTable />

                    <ButtonsContainer>
                        <Button variant="destructive" type="reset">
                            {t("form:reset")}
                        </Button>
                        <Button type="submit">{t("form:submit")}</Button>
                    </ButtonsContainer>
                </LeftSide>
                <RightSide>
                    <TowerGeometryDiagram />
                </RightSide>
            </StyledForm>
        </Form>
    );
};

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

export default AddTowerGeometryForm;
