import { styled } from "@linaria/react";
import {
    Button,
    Pagination,
    PaginationContent,
    PaginationItem,
} from "@repo/ui";
import { Table } from "@tanstack/react-table";
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react";

import { ConductorType } from "./RowType";

interface ConductorTypeTablePaginationProps {
    table: Table<ConductorType>;
}

const ConductorTypeTablePagination: React.FC<
    ConductorTypeTablePaginationProps
> = ({ table }) => (
    <Wrapper>
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <Button
                        variant="outline"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronsLeft className="h-4 w-4" />
                    </Button>
                </PaginationItem>
                <PaginationItem>
                    <Button
                        variant="outline"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                </PaginationItem>
                <PaginationItem>
                    <Button
                        variant="outline"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </PaginationItem>
                <PaginationItem>
                    <Button
                        variant="outline"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <ChevronsRight className="h-4 w-4" />
                    </Button>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    </Wrapper>
);

const Wrapper = styled.div``;
export default ConductorTypeTablePagination;
