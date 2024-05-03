import { styled } from "@linaria/react";
import {
    Button,
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    Popover,
    PopoverContent,
    PopoverTrigger,
    ScrollArea,
} from "@repo/ui";
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
                <StyledButton
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
                    <StyledChevron />
                </StyledButton>
            </PopoverTrigger>
            <StyledPopoverContent>
                <Command>
                    <CommandInput placeholder={t("searchPlaceholder")} />
                    <CommandList>
                        <StyledScrollArea>
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
                                            <StyledCheck
                                                selected={
                                                    value === conductorType.id
                                                }
                                            />
                                            {conductorType.name}
                                        </CommandItem>
                                    );
                                })}
                            </CommandGroup>
                        </StyledScrollArea>
                    </CommandList>
                </Command>
            </StyledPopoverContent>
        </Popover>
    );
});

export default TowerGeometrySelect;

const StyledCheck = styled(Check)<{ selected: boolean }>`
    margin-right: 0.5rem;
    width: 1rem;
    height: 1rem;
    opacity: ${(props) => (props.selected ? 1 : 0)};
`;

const StyledScrollArea = styled(ScrollArea)`
    height: 20rem;
`;

const StyledChevron = styled(ChevronsUpDown)`
    margin-left: 0.5rem;
    flex-shrink: 0;
    width: 1rem;
    height: 1rem;
    opacity: 0.5;
`;

const StyledPopoverContent = styled(PopoverContent)`
    padding: 0;
    width: 200px;
`;

const StyledButton = styled(Button)`
    justify-content: space-between;
    width: 100%;
`;
