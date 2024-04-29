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
} from "@repo/ui";
import { Check, ChevronsUpDown } from "lucide-react";
import { forwardRef, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { RouterOutputs } from "~/utils/trpc";

export interface SourceSelectProps
    extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
    data: RouterOutputs["source"]["getAllByProjectId"];
    onChange?: (value: string | number | readonly string[] | undefined) => void;
}

const SourceSelect = forwardRef<HTMLButtonElement, SourceSelectProps>(
    ({ data, value, onChange, ...props }, ref) => {
        const { t } = useTranslation("sourceSelect");
        const [open, setOpen] = useState(false);

        function handleSelect(currentSource: typeof value) {
            if (onChange)
                onChange(currentSource === value ? "" : currentSource);
            setOpen(false);
        }
        const currentValue = useMemo(() => {
            if (value) {
                const currentSource = data.find(
                    (source) => source.id === value
                );
                if (currentSource) {
                    return currentSource.name;
                }
                throw Error("Can't find source.");
            }
            return t("select");
        }, [data, t, value]);

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
                        {currentValue}

                        <StyledChevron />
                    </StyledButton>
                </PopoverTrigger>
                <StyledPopoverContent>
                    <Command>
                        <CommandInput placeholder={t("search.placeholder")} />
                        <CommandEmpty>{t("noneFound")}</CommandEmpty>

                        <CommandList>
                            <CommandGroup>
                                {data.map((source) => (
                                    <CommandItem
                                        key={source.id}
                                        value={source.id}
                                        keywords={[source.name]}
                                        onSelect={handleSelect}
                                    >
                                        <StyledIcon
                                            selected={value === source.id}
                                        />
                                        {source.name}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
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
