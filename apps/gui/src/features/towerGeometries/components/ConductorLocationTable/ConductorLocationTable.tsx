import { Plus, X, FlipHorizontal } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useFieldArray, useFormContext } from "react-hook-form";

import {
    Button,
    Card,
    CardContent,
    CardHeader,
    CardHeaderActions,
    CardHeaderText,
    CardTitle,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
    Input,
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
    Table,
    TableHead,
    TableBody,
    TableHeader,
    TableRow,
    TableCell,
} from "@repo/ui";

import type { TowerGeometryInput } from "@repo/validators/schemas/TowerGeometry.schema";
import { defaultConductorLocation } from "@repo/validators/schemas/ConductorLocation.schema";

interface Props {}

const ConductorLocationTable: React.FC<Props> = () => {
    const { t } = useTranslation("conductorLocations");
    const { resetField, control, getFieldState, getValues, formState } =
        useFormContext<TowerGeometryInput>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "conductors",
    });
    const { isDirty } = getFieldState("conductors");

    function mirrorConductors() {
        const conductors = getValues("conductors");
        conductors.forEach((field) => {
            if (field.x === 0 || field.x === null || field.y === null) {
                return;
            }
            const newConductor = {
                x: -field.x,
                y: field.y,
            };
            if (
                conductors.some(
                    (conductor) =>
                        conductor.x === newConductor.x &&
                        conductor.y === newConductor.y
                )
            ) {
                return;
            }
            append(newConductor);
        });
    }
    return (
        <Card>
            <CardHeader>
                <CardHeaderText>
                    <CardTitle>{t("title")}</CardTitle>
                </CardHeaderText>
                <CardHeaderActions>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    type="button"
                                    variant="secondary"
                                    size="icon"
                                    onClick={() => mirrorConductors()}
                                    disabled={!isDirty}
                                >
                                    <FlipHorizontal />
                                </Button>
                            </TooltipTrigger>

                            <TooltipContent>
                                <p>{t("mirrorTooltip")}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

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
                                <p>{t("deleteAll.tooltip")}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    size="icon"
                                    variant="secondary"
                                    type="button"
                                    onClick={() =>
                                        append([
                                            { ...defaultConductorLocation },
                                        ])
                                    }
                                >
                                    <Plus />
                                </Button>
                            </TooltipTrigger>

                            <TooltipContent>
                                <p>{t("addConductor.tooltip")}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </CardHeaderActions>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead id="number">
                                {t("number.title")}
                            </TableHead>
                            <TableHead id="xcoord">
                                {t("xCoord.title")}
                            </TableHead>
                            <TableHead id="ycoord">
                                {t("yCoord.title")}
                            </TableHead>
                            <TableHead id="actions">{"  "}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {fields.map((row, index) => (
                            <TableRow key={row.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    <FormField
                                        control={control}
                                        name={`conductors.${index}.x`}
                                        render={({
                                            field: { ...fieldProps },
                                        }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        {...fieldProps}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </TableCell>
                                <TableCell>
                                    <FormField
                                        name={`conductors.${index}.y`}
                                        render={({
                                            field: { ...fieldProps },
                                        }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        {...fieldProps}
                                                    />
                                                </FormControl>
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
                                                    aria-labelledby="actions"
                                                    variant="destructive"
                                                    size="icon"
                                                    onClick={() =>
                                                        remove(index)
                                                    }
                                                    disabled={
                                                        fields.length <= 1
                                                    }
                                                >
                                                    <X />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                {t("deleteConductorTooltip")}
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <FormMessage>
                    {formState.errors.conductors?.root?.message}
                </FormMessage>
            </CardContent>
        </Card>
    );
};

export default ConductorLocationTable;
