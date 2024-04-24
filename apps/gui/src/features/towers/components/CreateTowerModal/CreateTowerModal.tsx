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
import {
    CreateTransmissionTowerInput,
    createTransmissionTowerSchema,
    defaultTransmissionTower,
} from "@repo/validators";
import { LineID } from "@repo/validators/schemas/Ids.schema";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { StyledForm } from "~/components/StyledForm";
import { TowerGeometrySelect } from "~/features/towerGeometries";
import trpc from "~/utils/trpc";

export interface CreateTowerModalProps {
    lineId: LineID;
    onClose: () => void;
}

export default function CreateTowerModal({
    lineId,
    onClose,
}: CreateTowerModalProps) {
    const { t } = useTranslation("addTowerModal");
    const utils = trpc.useUtils();
    const form = useForm<CreateTransmissionTowerInput>({
        resolver: zodResolver(createTransmissionTowerSchema),
        values: {
            ...defaultTransmissionTower,
            lineId,
        },
    });
    const createTowerMutation = trpc.tower.create.useMutation({});
    const submitHandler = form.handleSubmit(async (data) => {
        await createTowerMutation.mutateAsync(data);
        await utils.tower.getAllByLineId.invalidate({
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
                    <StyledForm onSubmit={submitHandler}>
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
                        <DialogFooter>
                            <Button type="submit">{t("form:create")}</Button>
                        </DialogFooter>
                    </StyledForm>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
