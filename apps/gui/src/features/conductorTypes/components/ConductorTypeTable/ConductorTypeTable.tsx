import { Link } from "react-router-dom";
import { Info } from "lucide-react";
import { styled } from "@linaria/react";
import { Button } from "@repo/ui";
import { useTranslation } from "react-i18next";
import { useCallback, useMemo, useState } from "react";
import {
    getCoreRowModel,
    useReactTable,
    createColumnHelper,
    PaginationState,
} from "@tanstack/react-table";

import ROUTES from "@/router/routes";
import trpc, { RouterOutputs } from "@/utils/trpc";
import DataTable from "./DataTable";

import ConductorTypeTableToolbar from "./ConductorTypeTableToolbar";
import ConductorTypeTablePagination from "./ConductorTypeTablePagination";

const columnHelper =
    createColumnHelper<RouterOutputs["conductorType"]["getAll"]>();

interface EditButtonProps {
    id: number;
}

const EditButton: React.FC<EditButtonProps> = ({ id }) => (
    <Button asChild variant="ghost" size="icon">
        <Link to={ROUTES.UPDATE_CONDUCTOR_TYPE.buildPath({ id })}>
            <Info />
        </Link>
    </Button>
);

interface Props {}

const ConductorTable: React.FC<Props> = () => {
    const { t } = useTranslation("conductorType");

    const columns = useMemo(
        () => [
            columnHelper.accessor("name", {
                header: () => t("name.label"),
            }),
            columnHelper.accessor("outerDiameter", {
                header: () => t("outerDiameter.label"),
            }),
            columnHelper.accessor("acResistance75", {
                header: () => t("acResistance75.label"),
            }),
            columnHelper.accessor("gmr", {
                header: () => t("gmr.label"),
            }),
            columnHelper.accessor("id", {
                id: "id",
                header: () => t("table:actions"),
                cell: (props) => <EditButton id={props.getValue()} />,
            }),
        ],
        [t]
    );

    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const defaultData = useMemo(() => [], []);
    const pagination = useMemo(
        () => ({
            pageIndex,
            pageSize,
        }),
        [pageIndex, pageSize]
    );
    const { data, isLoading, error } = trpc.conductorType.getAll.useQuery(
        {
            pageIndex,
            pageSize,
        },
        { keepPreviousData: true }
    );
    const table = useReactTable({
        data: data ?? defaultData,
        columns,
        onPaginationChange: setPagination,
        manualPagination: true,
        state: {
            pagination,
        },
        pageCount: 10,

        getCoreRowModel: getCoreRowModel(),
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
