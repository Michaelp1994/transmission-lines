import { zodResolver } from "@hookform/resolvers/zod";
import { styled } from "@linaria/react";
import {
    Button,
    Checkbox,
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
import { UpdateConductorInput, updateConductorSchema } from "@repo/validators";
import { ConductorID, LineID } from "@repo/validators/schemas/Ids.schema";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { ConductorTypeSelect } from "~/features/conductorTypes";
import trpc from "~/utils/trpc";

export interface UpdateConductorModalProps {
    conductorId: ConductorID;
    lineId: LineID;
    onClose: () => void;
}

const UpdateConductorModal: React.FC<UpdateConductorModalProps> = ({
    conductorId,
    lineId,
    onClose,
}) => {
    const { t } = useTranslation("updateConductorModal");
    const utils = trpc.useUtils();
    const { data, error, isLoading } = trpc.conductor.getById.useQuery({
        id: conductorId,
    });
    const updateMutation = trpc.conductor.update.useMutation();

    const form = useForm<UpdateConductorInput>({
        resolver: zodResolver(updateConductorSchema),
        values: data,
    });

    const handleSubmit = form.handleSubmit(async (values) => {
        await updateMutation.mutateAsync(values);
        // TODO: invalidate data
        await utils.conductor.getAllByLineId.invalidate({ lineId });
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
                                name="fromPhase"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t("fromPhase.label")}
                                        </FormLabel>
                                        <FormControl>
                                            <NumberInput
                                                type="number"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            {t("fromPhase.description")}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="toPhase"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t("toPhase.label")}
                                        </FormLabel>
                                        <FormControl>
                                            <NumberInput
                                                type="number"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            {t("toPhase.description")}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="bundleNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t("bundleNumber.label")}
                                        </FormLabel>
                                        <FormControl>
                                            <NumberInput
                                                type="number"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            {t("bundleNumber.description")}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="bundleSpacing"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t("bundleSpacing.label")}
                                        </FormLabel>
                                        <FormControl>
                                            <NumberInput
                                                type="number"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            {t("bundleSpacing.description")}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="isNeutral"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t("isNeutral.label")}
                                        </FormLabel>
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            {t("isNeutral.description")}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="typeId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t("typeId.label")}
                                        </FormLabel>
                                        <FormControl>
                                            <ConductorTypeSelect {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            {t("typeId.description")}
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
};

export default UpdateConductorModal;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;
