import { styled } from "@linaria/react";
import {
    Button,
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    FormControl,
    Popover,
    PopoverContent,
    PopoverTrigger,
    ScrollArea,
} from "@repo/ui";
import { Check, ChevronsUpDown } from "lucide-react";
import { forwardRef, useState } from "react";
import { useTranslation } from "react-i18next";

import trpc from "~/utils/trpc";

interface ConductorTypeSelectProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const ConductorTypeSelect = forwardRef<
    HTMLButtonElement,
    ConductorTypeSelectProps
>(({ value, onChange, ...props }, ref) => {
    const { t } = useTranslation("conductorType");
    const { data, error, isLoading } = trpc.conductorType.getAll.useQuery();
    const [open, setOpen] = useState(false);
    function handleSelect(currentValue: string) {
        if (onChange) onChange(currentValue === value ? "" : currentValue);
        setOpen(false);
    }
    if (isLoading) {
        return <div>{t("general:loading")}</div>;
    }
    if (error || !data) {
        return <div>{t("general:errorMessage")}</div>;
    }
    return (
        <Popover open={open} onOpenChange={setOpen} modal>
            <PopoverTrigger asChild>
                <FormControl>
                    <StyledButton
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        ref={ref}
                        {...props}
                    >
                        {value
                            ? data.find(
                                  (conductorType) => conductorType.id === value
                              )?.name
                            : t("selectConductorType")}
                        <StyledChevron />
                    </StyledButton>
                </FormControl>
            </PopoverTrigger>
            <StyledPopoverContent>
                <Command>
                    <CommandInput placeholder={t("searchConductors")} />
                    <StyledScrollArea>
                        <CommandEmpty>{t("noneFound")}</CommandEmpty>
                        <CommandList>
                            <CommandGroup>
                                {data?.map((conductorType) => (
                                    <CommandItem
                                        key={conductorType.id}
                                        value={conductorType.id}
                                        keywords={[conductorType.name]}
                                        onSelect={handleSelect}
                                    >
                                        <StyledIcon
                                            selected={
                                                value === conductorType.id
                                            }
                                        />
                                        {conductorType.name}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </StyledScrollArea>
                </Command>
            </StyledPopoverContent>
        </Popover>
    );
});

export default ConductorTypeSelect;

const StyledIcon = styled(Check)<{ selected: boolean }>`
    margin-right: 0.5rem;
    width: 1rem;
    height: 1rem;
    opacity: ${(props) => (props.selected ? 1 : 0)};
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

const StyledScrollArea = styled(ScrollArea)`
    height: 20rem;
`;
