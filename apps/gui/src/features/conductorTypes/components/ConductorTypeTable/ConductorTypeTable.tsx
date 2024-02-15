import { styled } from "@linaria/react";
import {
    ColumnFiltersState,
    PaginationState,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import trpc from "@/utils/trpc";

import useColumns, { ConductorType } from "./columns";
import ConductorTypeTablePagination from "./ConductorTypeTablePagination";
import ConductorTypeTableToolbar from "./ConductorTypeTableToolbar";
import DataTable from "./DataTable";

interface Props {}

const ConductorTable: React.FC<Props> = () => {
    const { t } = useTranslation("conductorType");
    const columns = useColumns();

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
            <ConductorTypeTableToolbar table={table} />
            <DataTable table={table} />
            <ConductorTypeTablePagination table={table} />
        </ContentContainer>
    );
};

export default ConductorTable;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;
