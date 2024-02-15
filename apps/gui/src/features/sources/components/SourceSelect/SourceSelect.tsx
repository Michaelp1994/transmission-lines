import { styled } from "@linaria/react";
import {
    Button,
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@repo/ui";
import { Check, ChevronsUpDown } from "lucide-react";
import { forwardRef, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import trpc from "@/utils/trpc";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    projectId: string;
}

const SourceSelect = forwardRef<HTMLButtonElement, Props>(
    ({ projectId, value, onChange, ...props }, ref) => {
        const { t } = useTranslation("source");
        const { data, error, isLoading } = trpc.source.getAll.useQuery({
            projectId,
        });
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

        function handleSelect(currentValue) {
            if (onChange) onChange(currentValue === value ? "" : currentValue);
            setOpen(false);
        }
        return (
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <StyledButton
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        ref={ref}
                        {...props}
                    >
                        {value
                            ? data?.find((source) => source.id === value)?.name
                            : t("select")}
                        <StyledChevron />
                    </StyledButton>
                </PopoverTrigger>
                <StyledPopoverContent>
                    <Command shouldFilter={false}>
                        <CommandInput
                            placeholder={t("searchSources")}
                            value={search}
                            onValueChange={setSearch}
                        />
                        <CommandEmpty>{t("noneFound")}</CommandEmpty>
                        <CommandGroup>
                            {filteredItems?.map((source) => (
                                <CommandItem
                                    key={source.id}
                                    value={source.id}
                                    onSelect={handleSelect}
                                >
                                    <StyledIcon
                                        selected={value === source.id}
                                    />
                                    {source.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </Command>
                </StyledPopoverContent>
            </Popover>
        );
    }
);

export default SourceSelect;

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
