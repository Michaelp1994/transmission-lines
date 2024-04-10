import { Source } from "@repo/db/schemas/sources";
import { createColumnHelper } from "@tanstack/react-table";
import { t } from "i18next";

import RowActions from "./RowActions";

const columnHelper = createColumnHelper<Source>();

export default [
    columnHelper.accessor("name", {
        header: () => t("name.label", { ns: "conductorConfiguration" }),
        cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("x1r1", {
        header: () => "X1R1",
        cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("x0r0", {
        header: () => "X0R0",
        cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("resistance", {
        header: "Resistance",
        cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("frequency", {
        header: "Frequency",
        cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("isc1", {
        header: "ISC1",
        cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("isc3", {
        header: "ISC3",
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
