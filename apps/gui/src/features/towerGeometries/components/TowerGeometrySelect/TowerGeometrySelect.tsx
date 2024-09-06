import { Button } from "@repo/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@repo/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@repo/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import React, { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import trpc from "~/utils/trpc";

interface TowerGeometrySelectProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

/**
 * For now, the id is coming from the database and being cast to a string,
 *  as cmdk doesn't allow using integers for values.
 *  Eventually, either transform to string in the backend or wait for cmdk to fix this.
 *
 * Also the size changes when the text grows/shrinks.
 */

const TowerGeometrySelect = forwardRef<
    HTMLButtonElement,
    TowerGeometrySelectProps
>(({ onChange, value, ...props }, ref) => {
    const { t } = useTranslation("towerGeometry");
    const { data, error, isLoading } = trpc.towerGeometry.getAll.useQuery();
    const [open, setOpen] = React.useState(false);

    function handleSelect(currentValue: string) {
        if (onChange) {
            onChange(currentValue === value ? "" : currentValue);
        }
        setOpen(false);
    }

    if (isLoading) {
        return <div>{t("general:loading")}</div>;
    }
    if (error || !data) {
        return <div>{t("general:errorMessage")}</div>;
    }

    return (
        <Popover modal open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    ref={ref}
                    aria-expanded={open}
                    {...props}
                >
                    {value
                        ? data.find(
                              (towerGeometry) => towerGeometry.id === value
                          )?.name
                        : t("nothingSelected")}
                    <ChevronsUpDown />
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <Command>
                    <CommandInput placeholder={t("searchPlaceholder")} />
                    <CommandList>
                        <CommandEmpty>{t("noneFound")}</CommandEmpty>
                        <CommandGroup>
                            {data.map((conductorType) => {
                                return (
                                    <CommandItem
                                        key={conductorType.id}
                                        value={conductorType.id}
                                        keywords={[conductorType.name]}
                                        onSelect={handleSelect}
                                    >
                                        <Check
                                            selected={
                                                value === conductorType.id
                                            }
                                        />
                                        {conductorType.name}
                                    </CommandItem>
                                );
                            })}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
});

TowerGeometrySelect.displayName = "TowerGeometrySelect";

export default TowerGeometrySelect;
