import { DataTable } from "@repo/ui/data-table/DataTable";
import {
    type ColumnFiltersState,
    getCoreRowModel,
    type PaginationState,
    useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import trpc from "~/utils/trpc";

import type { ConductorType } from "./RowType";

import columns from "./columns";

export default function ConductorTypeTable() {
    const { t } = useTranslation("conductorTypeTable");

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const defaultData: ConductorType[] = [];

    const { data, isLoading, isError } = trpc.conductorType.getAll.useQuery(
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
    if (isError || !data) {
        return <div>{t("general:errorMessage")}</div>;
    }

    return (
        <div className="flex flex-col gap-4">
            <DataTable table={table} />
        </div>
    );
}
