import {
    Button,
    Pagination,
    PaginationContent,
    PaginationItem,
} from "@repo/ui";
import type { Table } from "@tanstack/react-table";
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
                        variant="outline"
                        disabled={!table.getCanPreviousPage()}
                        onClick={() => {
                            table.setPageIndex(0);
                        }}
                    >
                        <ChevronsLeft className="h-4 w-4" />
                    </Button>
                </PaginationItem>
                <PaginationItem>
                    <Button
                        variant="outline"
                        disabled={!table.getCanPreviousPage()}
                        onClick={() => {
                            table.previousPage();
                        }}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                </PaginationItem>
                <PaginationItem>
                    <Button
                        variant="outline"
                        disabled={!table.getCanNextPage()}
                        onClick={() => {
                            table.nextPage();
                        }}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </PaginationItem>
                <PaginationItem>
                    <Button
                        variant="outline"
                        disabled={!table.getCanNextPage()}
                        onClick={() => {
                            table.nextPage();
                        }}
                    >
                        <ChevronsRight className="h-4 w-4" />
                    </Button>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
