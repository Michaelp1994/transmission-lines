import { Link } from "@tanstack/react-router";
import { createColumnHelper } from "@tanstack/react-table";
import { t } from "i18next";
import RowActions from "./RowActions";
import type { TransmissionLine } from "./RowType";

const columnHelper = createColumnHelper<TransmissionLine>();

export default [
    columnHelper.accessor("name", {
        header: () => t("name.label", { ns: "conductorConfiguration" }),
        cell: (info) => {
            return (
                <Link
                    to="/projects/$projectId/lines/$lineId"
                    params={{
                        lineId: info.row.original.id,
                        projectId: info.row.original.projectId,
                    }}
                >
                    {info.getValue()}
                </Link>
            );
        },
    }),
    columnHelper.accessor("fromSource.name", {
        header: () => "From",
        cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("toSource.name", {
        header: () => "To",
        cell: (info) => info.renderValue(),
    }),
    columnHelper.display({
        id: "id",
        header: "",
        meta: {
            align: "right",
        },
        cell: RowActions,
    }),
];
