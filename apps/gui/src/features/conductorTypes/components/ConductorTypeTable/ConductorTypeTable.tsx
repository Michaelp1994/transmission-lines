import { styled } from "@linaria/react";
import {
    ColumnFiltersState,
    PaginationState,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import columns from "./columns";
import { ConductorType } from "./RowType";
import TablePagination from "./TablePagination";
import TableToolbar from "./TableToolbar";

import DataTable from "~/components/DataTable";
import trpc from "~/utils/trpc";

interface ConductorTableProps {}

const ConductorTable: React.FC<ConductorTableProps> = () => {
    const { t } = useTranslation("conductorType");

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const defaultData: ConductorType[] = [];

    const { data, isLoading, error } = trpc.conductorType.getAll.useQuery(
        {
            pageIndex: pagination.pageIndex,
            pageSize: pagination.pageSize,
        },
        { keepPreviousData: true }
    );

    const { data: pageCount } = trpc.conductorType.getCount.useQuery({
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
    });

    const table = useReactTable({
        data: data || defaultData,
        columns,
        onPaginationChange: setPagination,
        manualPagination: true,
        state: {
            pagination,
            columnFilters,
        },
        pageCount: pageCount ?? -1,
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
    });

    if (isLoading) {
        return <div>{t("general:loading")}</div>;
    }
    if (error || !data) {
        return <div>{t("general:errorMessage")}</div>;
    }

    return (
        <ContentContainer>
            <TableToolbar table={table} />
            <DataTable data={data} columns={columns} />
            <TablePagination table={table} />
        </ContentContainer>
    );
};

export default ConductorTable;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;
