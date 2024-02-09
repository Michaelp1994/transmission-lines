import {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardHeaderActions,
    CardHeaderText,
    CardTitle,
    Checkbox,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
    Input,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@repo/ui";
import { defaultConductor } from "@repo/validators/schemas/Conductor.schema";
import type { TransmissionLineInput } from "@repo/validators/schemas/TransmissionLine.schema";
import { Plus, X } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { ConductorTypeSelect } from "@/features/conductorTypes";
import GenerateConductorsModal from "@/features/transmissionLines/components/GenerateConductorsModal";
import generateConductors from "@/helpers/generateConductors";


interface Props {}

const ConductorConfigurationTable: React.FC<Props> = () => {
    const { t } = useTranslation("conductorConfiguration");
    const {
        trigger,
        control,
        resetField,
        getFieldState,
        formState: { errors },
    } = useFormContext<TransmissionLineInput>();
    const { fields, append, remove, replace } = useFieldArray({
        control,
        name: "conductors",
    });
    const { isDirty } = getFieldState("conductors");

    return (
        <Card>
            <CardHeader>
                <CardHeaderText>
                    <CardTitle>{t("title")}</CardTitle>
                    <CardDescription>{t("description")}</CardDescription>
                    <FormMessage>
                        {errors.conductors?.root?.message}
                    </FormMessage>
                </CardHeaderText>
                <CardHeaderActions>
                    <GenerateConductorsModal
                        onSubmit={(values) => {
                            replace(generateConductors(values));
                            trigger("conductors");
                        }}
                    />
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    onClick={() => resetField("conductors")}
                                    disabled={!isDirty}
                                >
                                    <X />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{t("deleteAllTooltip")}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    type="button"
                                    size="icon"
                                    onClick={() =>
                                        append({ ...defaultConductor })
                                    }
                                >
                                    <Plus />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{t("addTooltip")}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </CardHeaderActions>
            </CardHeader>

            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>{t("name.label")}</TableHead>
                            <TableHead>{t("fromPhase.label")}</TableHead>
                            <TableHead>{t("toPhase.label")}</TableHead>
                            <TableHead>{t("bundleNumber.label")}</TableHead>
                            <TableHead>{t("bundleSpacing.label")}</TableHead>
                            <TableHead>{t("isNeutral.label")}</TableHead>
                            <TableHead>{t("type.label")}</TableHead>
                            <TableHead>{t("table:actions")}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {fields.map((_field, index) => (
                            <TableRow key={_field.id}>
                                <TableCell>
                                    <FormField
                                        name={`conductors.${index}.name`}
                                        render={({ field }) => (
                                            <FormItem>
                                                {/* <FormLabel className="sr-only">
                                            Conductor Name
                                        </FormLabel> */}
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </TableCell>

                                <TableCell>
                                    <FormField
                                        name={`conductors.${index}.fromPhase`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        {...field}
                                                    />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </TableCell>
                                <TableCell>
                                    <FormField
                                        name={`conductors.${index}.toPhase`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        {...field}
                                                    />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </TableCell>
                                <TableCell>
                                    <FormField
                                        name={`conductors.${index}.bundleNumber`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        {...field}
                                                    />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </TableCell>
                                <TableCell>
                                    <FormField
                                        name={`conductors.${index}.bundleSpacing`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        {...field}
                                                    />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </TableCell>
                                <TableCell>
                                    <FormField
                                        name={`conductors.${index}.isNeutral`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </TableCell>
                                <TableCell>
                                    <FormField
                                        name={`conductors.${index}.typeId`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <ConductorTypeSelect
                                                    {...field}
                                                />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="destructive"
                                                    size="icon"
                                                    type="button"
                                                    disabled={
                                                        fields.length === 1
                                                    }
                                                    onClick={() =>
                                                        remove(index)
                                                    }
                                                >
                                                    <X />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{t("deleteTooltip")}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default ConductorConfigurationTable;
