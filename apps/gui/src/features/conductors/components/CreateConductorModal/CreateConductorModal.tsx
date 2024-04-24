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
    type CreateConductorInput,
    createConductorSchema,
    defaultConductor,
} from "@repo/validators";
import { LineID } from "@repo/validators/schemas/Ids.schema";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { StyledForm } from "~/components/StyledForm";
import { ConductorTypeSelect } from "~/features/conductorTypes";
import trpc from "~/utils/trpc";

export interface CreateConductorModalProps {
    lineId: LineID;
    onClose: () => void;
}

export default function CreateConductorModal({
    lineId,
    onClose,
}: CreateConductorModalProps) {
    const { t } = useTranslation("addConductorModal");
    const utils = trpc.useUtils();
    const createConductorMutation = trpc.conductor.create.useMutation({});

    const form = useForm<CreateConductorInput>({
        resolver: zodResolver(createConductorSchema),
        values: {
            ...defaultConductor,
            lineId,
        },
    });
    const submitHandler = form.handleSubmit(async (data) => {
        await createConductorMutation.mutateAsync(data);
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
                            name="fromPhase"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        {t("fromPhase.label")}
                                    </FormLabel>
                                    <FormControl>
                                        <NumberInput type="number" {...field} />
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
                                    <FormLabel>{t("toPhase.label")}</FormLabel>
                                    <FormControl>
                                        <NumberInput type="number" {...field} />
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
                                        <NumberInput type="number" {...field} />
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
                                        <NumberInput type="number" {...field} />
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
                                    <CheckboxRow>
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <CheckboxText>
                                            <FormLabel>
                                                {t("isNeutral.label")}
                                            </FormLabel>
                                            <FormDescription>
                                                {t("isNeutral.description")}
                                            </FormDescription>
                                            <FormMessage />
                                        </CheckboxText>
                                    </CheckboxRow>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="typeId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("typeId.label")}</FormLabel>
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
                            <Button type="submit">{t("form:create")}</Button>
                        </DialogFooter>
                    </StyledForm>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

const CheckboxRow = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
`;

const CheckboxText = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
`;
