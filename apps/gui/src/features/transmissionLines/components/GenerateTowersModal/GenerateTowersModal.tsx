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
    DialogTrigger,
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
    NumberInput,
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@repo/ui";
import {
    GenerateTowersInput,
    defaultGenerateTowers,
    generateTowersSchema,
} from "@repo/validators/schemas/GenerateTowers.schema";
import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { TowerGeometrySelect } from "@/features/towerGeometries";

interface Props {
    onSubmit(values: GenerateTowersInput): void;
}

const GenerateTowersModal: React.FC<Props> = (props) => {
    const { t } = useTranslation("generateTowers");
    const [open, setOpen] = useState(false);
    const form = useForm<GenerateTowersInput>({
        resolver: zodResolver(generateTowersSchema),
        defaultValues: defaultGenerateTowers,
    });
    const handleOpenChange = useCallback(
        (value: boolean) => {
            if (!value) {
                form.reset();
            }
            setOpen(value);
        },
        [form]
    );
    const onSubmit: SubmitHandler<GenerateTowersInput> = (values) => {
        props.onSubmit(values);
        handleOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <TooltipProvider>
                <Tooltip>
                    <DialogTrigger asChild>
                        <TooltipTrigger asChild>
                            <Button>{t("form:generate")}</Button>
                        </TooltipTrigger>
                    </DialogTrigger>

                    <TooltipContent>
                        <p>{t("tooltip")}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <DialogContent>
                <Form {...form}>
                    <StyledForm
                        onSubmit={(e) => {
                            e.stopPropagation();
                            form.handleSubmit(onSubmit)(e);
                        }}
                        onReset={() => form.reset()}
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
};

export default GenerateTowersModal;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;
