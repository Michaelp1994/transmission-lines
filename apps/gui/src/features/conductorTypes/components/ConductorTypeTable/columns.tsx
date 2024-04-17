import { Link } from "@tanstack/react-router";
import { createColumnHelper } from "@tanstack/react-table";
import { t } from "i18next";

import RowActions from "./RowActions";
import { ConductorType } from "./RowType";

const columnHelper = createColumnHelper<ConductorType>();

export default [
    columnHelper.accessor("name", {
        header: () => t("name.label", { ns: "conductorType" }),
        cell: (info) => (
            <Link
                to="/conductor-types/$typeId"
                params={{
                    typeId: info.row.original.id,
                }}
            >
                {info.getValue()}
            </Link>
        ),
    }),
    columnHelper.accessor("outerDiameter", {
        header: () => t("outerDiameter.label", { ns: "conductorType" }),
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("acResistance75", {
        header: () => t("acResistance75.label", { ns: "conductorType" }),
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("gmr", {
        header: () => t("gmr.label", { ns: "conductorType" }),
        cell: (info) => info.getValue(),
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
