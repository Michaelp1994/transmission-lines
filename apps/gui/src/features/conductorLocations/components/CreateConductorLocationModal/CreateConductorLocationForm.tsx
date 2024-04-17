import { zodResolver } from "@hookform/resolvers/zod";
import { styled } from "@linaria/react";
import {
    Button,
    DialogFooter,
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
    CreateConductorLocationInput,
    createConductorLocationSchema,
    defaultConductorLocation,
} from "@repo/validators";
import { GeometryID } from "@repo/validators/schemas/Ids.schema";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import trpc from "@/utils/trpc";

interface CreateConductorLocationFormProps {
    geometryId: GeometryID;
    onSubmit: () => void;
}

export default function CreateConductorLocationForm({
    geometryId,
    onSubmit,
}: CreateConductorLocationFormProps) {
    const { t } = useTranslation("createConductorLocationModal");
    const utils = trpc.useUtils();
    const createMutation = trpc.conductorLocations.create.useMutation({});

    const form = useForm<CreateConductorLocationInput>({
        resolver: zodResolver(createConductorLocationSchema),
        values: {
            ...defaultConductorLocation,
            geometryId,
        },
    });
    const submitHandler = form.handleSubmit(async (data) => {
        await createMutation.mutateAsync(data);
        await utils.conductorLocations.getAllByGeometryId.invalidate({
            geometryId,
        });
        onSubmit();
    });
    return (
        <Form {...form}>
            <StyledForm onSubmit={submitHandler}>
                <FormField
                    control={form.control}
                    name="x"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("x.label")}</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} />
                            </FormControl>
                            <FormDescription>
                                {t("x.description")}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="y"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("y.label")}</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} />
                            </FormControl>
                            <FormDescription>
                                {t("y.description")}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <DialogFooter>
                    <Button type="submit">{t("form:create")}</Button>
                </DialogFooter>
            </StyledForm>
        </Form>
    );
}

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;
