import { zodResolver } from "@hookform/resolvers/zod";
import { styled } from "@linaria/react";
import {
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    NumberInput,
} from "@repo/ui";
import {
    GenerateConductorsInput,
    defaultGenerateConductors,
    generateConductorsSchema,
} from "@repo/validators/schemas/Conductor.schema";
import { LineID } from "@repo/validators/schemas/Ids.schema";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { ConductorTypeSelect } from "~/features/conductorTypes";
import trpc from "~/utils/trpc";

export interface GenerateConductorsModalProps {
    lineId: LineID;
    onClose: () => void;
}

export default function GenerateConductorsModal({
    lineId,
    onClose,
}: GenerateConductorsModalProps) {
    const { t } = useTranslation("generateConductors");
    const utils = trpc.useUtils();

    const form = useForm<GenerateConductorsInput>({
        resolver: zodResolver(generateConductorsSchema),
        values: {
            ...defaultGenerateConductors,
            lineId,
        },
    });
    const generateConductorsMutation = trpc.conductor.generate.useMutation();
    const handleSubmit = form.handleSubmit(async (values) => {
        const data = await generateConductorsMutation.mutateAsync(values);
        await utils.conductor.getAllByLineId.invalidate({
            lineId,
        });
        onClose();
    });

    return (
        <Dialog open defaultOpen onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t("modalTitle")}</DialogTitle>
                    <DialogDescription>
                        {t("modalDescription")}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <StyledForm onSubmit={handleSubmit}>
                        <FormField
                            control={form.control}
                            name="phases"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("phases.label")}</FormLabel>
                                    <FormControl>
                                        <NumberInput type="number" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        {t("phases.description")}
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="circuits"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("circuits.label")}</FormLabel>
                                    <FormControl>
                                        <NumberInput type="number" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        {t("circuits.description")}
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="neutrals"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("neutrals.label")}</FormLabel>
                                    <FormControl>
                                        <NumberInput type="number" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        {t("neutrals.description")}
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phaseTypeId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        {t("phaseConductorType.label")}
                                    </FormLabel>
                                    <FormControl>
                                        <ConductorTypeSelect {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        {t("phaseConductorType.description")}
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="neutralTypeId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        {t("neutralConductorType.label")}
                                    </FormLabel>
                                    <FormControl>
                                        <ConductorTypeSelect {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        {t("neutralConductorType.description")}
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit">{t("form:generate")}</Button>
                        </DialogFooter>
                    </StyledForm>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;
