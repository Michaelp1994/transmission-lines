import type { Table } from "@tanstack/react-table";

import { Button } from "@repo/ui/button";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from "@repo/ui/pagination";
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react";

import type { ConductorType } from "./RowType";

interface ConductorTypeTablePaginationProps {
    table: Table<ConductorType>;
}

export default function ConductorTypeTablePagination({
    table,
}: ConductorTypeTablePaginationProps) {
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <Button
                        disabled={!table.getCanPreviousPage()}
                        onClick={() => {
                            table.setPageIndex(0);
                        }}
                        variant="outline"
                    >
                        <ChevronsLeft className="h-4 w-4" />
                    </Button>
                </PaginationItem>
                <PaginationItem>
                    <Button
                        disabled={!table.getCanPreviousPage()}
                        onClick={() => {
                            table.previousPage();
                        }}
                        variant="outline"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                </PaginationItem>
                <PaginationItem>
                    <Button
                        disabled={!table.getCanNextPage()}
                        onClick={() => {
                            table.nextPage();
                        }}
                        variant="outline"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </PaginationItem>
                <PaginationItem>
                    <Button
                        disabled={!table.getCanNextPage()}
                        onClick={() => {
                            table.nextPage();
                        }}
                        variant="outline"
                    >
                        <ChevronsRight className="h-4 w-4" />
                    </Button>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
