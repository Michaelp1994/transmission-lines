import React from "react";
import { styled } from "@linaria/react";
import {
    Button,
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@repo/ui";
import { Table } from "@tanstack/react-table";
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react";

interface Props {
    table: Table<{}>;
}

const ConductorTypeTablePagination: React.FC<Props> = ({ table }) => {
    return (
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
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </PaginationItem>
                    <PaginationItem>
                        <Button
                            variant="outline"
                            onClick={() => table.nextPage()}
                        >
                            <ChevronsRight className="h-4 w-4" />
                        </Button>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </Wrapper>
    );
};

const Wrapper = styled.div``;
export default ConductorTypeTablePagination;
