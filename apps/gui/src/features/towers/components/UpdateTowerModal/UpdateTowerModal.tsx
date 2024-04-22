import { zodResolver } from "@hookform/resolvers/zod";
import { styled } from "@linaria/react";
import {
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogOverlay,
    DialogPortal,
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
    UpdateTransmissionTowerInput,
    updateTransmissionTowerSchema,
} from "@repo/validators";
import { LineID, TowerID } from "@repo/validators/schemas/Ids.schema";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { TowerGeometrySelect } from "~/features/towerGeometries";
import trpc from "~/utils/trpc";

export interface UpdateTowerModalProps {
    towerId: TowerID;
    lineId: LineID;
    onClose: () => void;
}

export default function UpdateTowerModal({
    onClose,
    lineId,
    towerId,
}: UpdateTowerModalProps) {
    const { t } = useTranslation("updateTowerModal");
    const utils = trpc.useUtils();
    const { data } = trpc.tower.getById.useQuery({
        id: towerId,
    });
    const updateMutation = trpc.tower.update.useMutation();
    const form = useForm<UpdateTransmissionTowerInput>({
        resolver: zodResolver(updateTransmissionTowerSchema),
        values: data,
    });

    const handleSubmit = form.handleSubmit(async (values) => {
        await updateMutation.mutateAsync(values);
        await utils.tower.getAllByLineId.invalidate({ lineId });
        onClose();
    });

    return (
        <Dialog open defaultOpen onOpenChange={onClose}>
            <DialogPortal>
                <DialogOverlay />
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
                                name="resistance"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t("resistance.label")}
                                        </FormLabel>
                                        <FormControl>
                                            <NumberInput
                                                type="number"
                                                {...field}
                                            />
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
                                        <FormLabel>
                                            {t("distance.label")}
                                        </FormLabel>
                                        <FormControl>
                                            <NumberInput
                                                type="number"
                                                {...field}
                                            />
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
                                <Button type="submit">
                                    {t("form:update")}
                                </Button>
                            </DialogFooter>
                        </StyledForm>
                    </Form>
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
}

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;
