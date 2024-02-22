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
    GenerateConductorsInput,
    defaultGenerateConductors,
    generateConductorsSchema,
} from "@repo/validators/schemas/GenerateConductors.schema";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { ConductorTypeSelect } from "@/features/conductorTypes";

interface Props {
    onSubmit(values: GenerateConductorsInput): void;
}

const GenerateConductorsModal: React.FC<Props> = (props) => {
    const { t } = useTranslation("generateConductors");
    const [open, setOpen] = useState(false);
    const form = useForm<GenerateConductorsInput>({
        resolver: zodResolver(generateConductorsSchema),
        defaultValues: defaultGenerateConductors,
    });

    function handleOpenChange(value: boolean) {
        if (!value) {
            form.reset();
        }
        setOpen(value);
    }
    const onSubmit: SubmitHandler<GenerateConductorsInput> = (values) => {
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

            <DialogContent onCloseAutoFocus={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>{t("modalTitle")}</DialogTitle>
                    <DialogDescription>
                        {t("modalDescription")}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <StyledForm
                        onSubmit={(e) => {
                            e.stopPropagation();
                            form.handleSubmit(onSubmit)(e);
                        }}
                        onReset={() => form.reset()}
                    >
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
                            name="phaseConductorTypeId"
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
                            name="neutralConductorTypeId"
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
};

export default GenerateConductorsModal;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;
