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
    Input,
    NumberInput,
} from "@repo/ui";
import { LineID } from "@repo/validators/schemas/Ids.schema";
import {
    GenerateTowersInput,
    defaultGenerateTowers,
    generateTowersSchema,
} from "@repo/validators/schemas/TransmissionTower.schema";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { TowerGeometrySelect } from "~/features/towerGeometries";
import trpc from "~/utils/trpc";

export interface GenerateTowersModalProps {
    lineId: LineID;
    onClose: () => void;
}

export default function GenerateTowersModal({
    onClose,
    lineId,
}: GenerateTowersModalProps) {
    const { t } = useTranslation("generateTowers");
    const utils = trpc.useUtils();
    const generateMutation = trpc.tower.generate.useMutation();
    const form = useForm<GenerateTowersInput>({
        resolver: zodResolver(generateTowersSchema),
        values: {
            ...defaultGenerateTowers,
            lineId,
        },
    });

    const handleSubmit = form.handleSubmit(async (values) => {
        await generateMutation.mutateAsync(values);
        await utils.tower.getAllByLineId.invalidate({
            lineId: values.lineId,
        });
        onClose();
    });

    return (
        <Dialog open defaultOpen onOpenChange={onClose}>
            <DialogContent>
                <Form {...form}>
                    <StyledForm
                        onReset={() => form.reset()}
                        onSubmit={handleSubmit}
                    >
                        <DialogHeader>
                            <DialogTitle>{t("modalTitle")}</DialogTitle>
                            <DialogDescription>
                                {t("modalDescription")}
                            </DialogDescription>
                        </DialogHeader>

                        <FormField
                            control={form.control}
                            name="namePrefix"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        {t("namePrefix.label")}
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        {t("namePrefix.description")}
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="geometryId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        {t("geometryId.label")}
                                    </FormLabel>
                                    <FormControl>
                                        <TowerGeometrySelect {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        {t("geometryId.description")}
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="numTowers"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        {t("numTowers.label")}
                                    </FormLabel>
                                    <FormControl>
                                        <NumberInput type="number" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        {t("numTowers.description")}
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="resistance"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        {t("resistance.label")}
                                    </FormLabel>
                                    <FormControl>
                                        <NumberInput type="number" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        {t("resistance.description")}
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="distance"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("distance.label")}</FormLabel>
                                    <FormControl>
                                        <NumberInput type="number" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        {t("distance.description")}
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
