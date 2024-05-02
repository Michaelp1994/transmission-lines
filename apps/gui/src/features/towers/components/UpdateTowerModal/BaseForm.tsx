import {
    Button,
    DialogFooter,
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
import type { UpdateTransmissionTowerInput } from "@repo/validators";
import type { FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyledForm } from "~/components/StyledForm";
import { TowerGeometrySelect } from "~/features/towerGeometries";
import { useUpdateTransmissionTowerForm } from "~/utils/forms";

interface BaseFormProps {
    data: UpdateTransmissionTowerInput;
    onValid: (values: UpdateTransmissionTowerInput) => void;
    onInvalid: (errors: FieldErrors<UpdateTransmissionTowerInput>) => void;
}

export default function BaseForm({ onValid, onInvalid, data }: BaseFormProps) {
    const form = useUpdateTransmissionTowerForm(data);
    const { t } = useTranslation("updateTowerModal");

    const handleSubmit = form.handleSubmit(
        (values) => { onValid(values); },
        (errors) => { onInvalid(errors); }
    );

    return (
        <Form {...form}>
            <StyledForm onSubmit={handleSubmit}>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => 
                        { return <FormItem>
                            <FormLabel>{t("name.label")}</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription>
                                {t("name.description")}
                            </FormDescription>
                            <FormMessage />
                        </FormItem> }
                    }
                />
                <FormField
                    control={form.control}
                    name="resistance"
                    render={({ field }) => 
                        { return <FormItem>
                            <FormLabel>{t("resistance.label")}</FormLabel>
                            <FormControl>
                                <NumberInput type="number" {...field} />
                            </FormControl>
                            <FormDescription>
                                {t("resistance.description")}
                            </FormDescription>
                            <FormMessage />
                        </FormItem> }
                    }
                />

                <FormField
                    control={form.control}
                    name="distance"
                    render={({ field }) => 
                        { return <FormItem>
                            <FormLabel>{t("distance.label")}</FormLabel>
                            <FormControl>
                                <NumberInput type="number" {...field} />
                            </FormControl>
                            <FormDescription>
                                {t("distance.description")}
                            </FormDescription>
                            <FormMessage />
                        </FormItem> }
                    }
                />
                <FormField
                    control={form.control}
                    name="geometryId"
                    render={({ field }) => 
                        { return <FormItem>
                            <FormLabel>{t("geometryId.label")}</FormLabel>
                            <FormControl>
                                <TowerGeometrySelect {...field} />
                            </FormControl>
                            <FormDescription>
                                {t("geometryId.description")}
                            </FormDescription>
                            <FormMessage />
                        </FormItem> }
                    }
                />
                <DialogFooter>
                    <Button type="submit">{t("form:update")}</Button>
                </DialogFooter>
            </StyledForm>
        </Form>
    );
}
