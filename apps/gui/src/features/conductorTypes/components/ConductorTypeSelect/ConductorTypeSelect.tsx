import { useTranslation } from "react-i18next";
import { styled } from "@linaria/react";
import { useMemo, useState, forwardRef } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Button,
    FormControl,
    ScrollArea,
} from "@repo/ui";

import trpc from "@/utils/trpc";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

/**
 * for now, the id is coming from the database and being cast to a string,
 *  as cmdk doesn't allow using integers for values.
 *  Eventually, either transform to string in the backend or wait for cmdk to fix this.
 *
 * Also the size changes when the text grows/shrinks
 */
const ConductorTypeSelect = forwardRef<HTMLButtonElement, Props>(
    ({ value, onChange, ...props }, ref) => {
        const { t } = useTranslation("conductorType");
        const { data, error, isLoading } = trpc.conductorType.getAll.useQuery();
        const [open, setOpen] = useState(false);
        const [search, setSearch] = useState("");
        const filteredItems = useMemo(
            () =>
                data?.filter(
                    /** dumb filtering, until cmdk allows for custom search key
                     * @see https://github.com/pacocoursey/cmdk/issues/181 */
                    (source) =>
                        source.name.toLowerCase().includes(search.toLowerCase())
                ),
            [data, search]
        );
        function handleSelect(currentValue: number) {
            if (onChange)
                onChange(
                    currentValue === value ? null : parseInt(currentValue, 10)
                );
            setOpen(false);
            setSearch("");
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
                                      (conductorType) =>
                                          conductorType.id === value
                                  )?.name
                                : t("selectConductorType")}
                            <StyledChevron />
                        </StyledButton>
                    </FormControl>
                </PopoverTrigger>
                <StyledPopoverContent>
                    <Command shouldFilter={false}>
                        <CommandInput
                            placeholder={t("searchConductors")}
                            value={search}
                            onValueChange={setSearch}
                        />
                        <StyledScrollArea>
                            <CommandEmpty>{t("noneFound")}</CommandEmpty>
                            <CommandGroup>
                                {filteredItems?.map((conductorType) => (
                                    <CommandItem
                                        key={conductorType.id}
                                        value={conductorType.id.toString()}
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
                        </StyledScrollArea>
                    </Command>
                </StyledPopoverContent>
            </Popover>
        );
    }
);

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
