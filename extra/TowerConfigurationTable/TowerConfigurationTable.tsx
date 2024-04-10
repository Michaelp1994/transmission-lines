import {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardHeaderActions,
    CardHeaderText,
    CardTitle,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
    Input,
    NumberInput,
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
import type { CreateTransmissionLineInput } from "@repo/validators/schemas/TransmissionLine.schema";
import { defaultTransmissionTower } from "@repo/validators/schemas/TransmissionTower.schema";
import { Plus, X } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import TowerGeometrySelect from "../../../towerGeometries/components/TowerGeometrySelect";
import GenerateTowersModal from "../GenerateTowersModal";

import generateTowers from "@/helpers/generateTowers";

interface Props {}

const TowerConfigurationTable: React.FC<Props> = () => {
    const { t } = useTranslation("towerConfiguration");
    const {
        trigger,
        control,
        resetField,
        getFieldState,
        formState: { errors },
    } = useFormContext<CreateTransmissionLineInput>();
    const { fields, append, remove, replace } = useFieldArray({
        control,
        name: "towers",
    });
    const { isDirty } = getFieldState("towers");

    return (
        <Card>
            <CardHeader>
                <CardHeaderText>
                    <CardTitle>{t("title")}</CardTitle>
                    <CardDescription>{t("description")}</CardDescription>
                    <FormMessage>{errors.towers?.root?.message}</FormMessage>
                </CardHeaderText>
                <CardHeaderActions>
                    <GenerateTowersModal
                        onSubmit={(values) => {
                            replace(generateTowers(values));
                            trigger("towers");
                        }}
                    />

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    onClick={() => {
                                        resetField("towers");
                                    }}
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
                                        append({
                                            ...defaultTransmissionTower,
                                        })
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
                            <TableHead>{t("resistance.label")}</TableHead>
                            <TableHead>{t("distance.label")}</TableHead>
                            <TableHead>{t("geometry.label")}</TableHead>
                            <TableHead>{t("table:actions")}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {fields.map((_field, index) => (
                            <TableRow key={_field.id}>
                                <TableCell>
                                    <FormField
                                        name={`towers.${index}.name`}
                                        render={({ field }) => (
                                            <FormItem>
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
                                        name={`towers.${index}.resistance`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <NumberInput
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
                                        name={`towers.${index}.distance`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <NumberInput
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
                                        name={`towers.${index}.geometryId`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <TowerGeometrySelect
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        disabled={fields.length === 1}
                                        onClick={() => remove(index)}
                                    >
                                        <X />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default TowerConfigurationTable;
