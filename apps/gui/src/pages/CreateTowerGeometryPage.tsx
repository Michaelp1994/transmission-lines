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
    CreateTowerGeometryInput,
    createTowerGeometrySchema,
    defaultTowerGeometry,
} from "@repo/validators/schemas/TowerGeometry.schema";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { ConductorLocationTable } from "@/features/towerGeometries";
import ROUTES from "@/router/routes";
import trpc from "@/utils/trpc";

interface Props {}

const CreateTowerGeometryPage: React.FC<Props> = () => {
    const { t } = useTranslation("towerGeometry");
    const navigate = useNavigate();
    const createTowerGeometryMutation = trpc.towerGeometry.create.useMutation();
    const form = useForm<CreateTowerGeometryInput>({
        resolver: zodResolver(createTowerGeometrySchema),
        defaultValues: defaultTowerGeometry,
    });

    async function onSubmit(values: CreateTowerGeometryInput) {
        try {
            await createTowerGeometryMutation.mutateAsync(values);
            toast.success(`${values.name} has been added.`, {
                description: format(new Date(), "PPPPpp"),
            });
            navigate(ROUTES.ALL_TOWER_GEOMETRIES.path);
        } catch (e) {
            console.log(e);
            toast.error("There was an error");
        }
    }

    return (
        <Wrapper>
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
                            <LeftSide>
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                {t("name.label")}
                                            </FormLabel>
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
                                    <Button type="submit">
                                        {t("form:submit")}
                                    </Button>
                                </ButtonsContainer>
                            </LeftSide>
                            <RightSide>
                                {/* <TowerGeometryDiagram /> */}
                            </RightSide>
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

export default CreateTowerGeometryPage;
