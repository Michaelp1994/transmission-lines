import { styled } from "@linaria/react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@repo/ui";
import type { Table } from "@tanstack/react-table";
import type { ConductorType } from "./RowType";

interface ConductorTypeToolbarProps {
    table: Table<ConductorType>;
}
export default function ConductorTypeToolbar({
    table,
}: ConductorTypeToolbarProps) {
    return (
        <ToolbarContainer>
            <LeftSide>
                {/* <StyledInput
                value={
                    (table.getColumn("name")?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                    table.getColumn("name")?.setFilterValue(event.target.value)
                }
                placeholder="Search conductor types..."
            /> */}
            </LeftSide>
            <RightSide>
                Rows per page:
                <Select
                    value={`${table.getState().pagination.pageSize}`}
                    onValueChange={(value) => {
                        table.setPageSize(Number(value));
                    }}
                >
                    <SelectTrigger className="h-8 w-[70px]">
                        <SelectValue
                            placeholder={table.getState().pagination.pageSize}
                        />
                    </SelectTrigger>
                    <SelectContent side="top">
                        {[10, 20, 30, 40, 50].map((pageSize) => {
                            return (
                                <SelectItem
                                    key={pageSize}
                                    value={`${pageSize}`}
                                >
                                    {pageSize}
                                </SelectItem>
                            );
                        })}
                    </SelectContent>
                </Select>
            </RightSide>
        </ToolbarContainer>
    );
}

const ToolbarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const LeftSide = styled.div`
    display: flex;
    gap: 0.5rem;
    align-items: center;
`;

const RightSide = styled.div`
    display: flex;
    gap: 0.5rem;
    align-items: center;
`;
