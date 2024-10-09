import type { Table } from "@tanstack/react-table";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@repo/ui/select";

import type { ConductorType } from "./RowType";

interface ConductorTypeToolbarProps {
    table: Table<ConductorType>;
}
export default function ConductorTypeToolbar({
    table,
}: ConductorTypeToolbarProps) {
    return (
        <div>
            <div>
                Rows per page:
                <Select
                    onValueChange={(value) => {
                        table.setPageSize(Number(value));
                    }}
                    value={`${table.getState().pagination.pageSize}`}
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
            </div>
        </div>
    );
}
