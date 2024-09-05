import {
    type ColumnFiltersState,
    type PaginationState,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import columns from "./columns";
import type { ConductorType } from "./RowType";
import TablePagination from "./TablePagination";
import TableToolbar from "./TableToolbar";
import DataTable from "~/components/DataTable";
import trpc from "~/utils/trpc";

export default function ConductorTypeTable() {
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
        <div className="flex flex-col gap-4">
            <TableToolbar table={table} />
            <DataTable data={data} columns={columns} />
            <TablePagination table={table} />
        </div>
    );
}
