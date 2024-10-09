import { createColumnHelper } from "@tanstack/react-table";
import { t } from "i18next";

import type { ConductorLocation } from "./type";

import RowActions from "./RowActions";

const columnHelper = createColumnHelper<ConductorLocation>();

export default [
    columnHelper.accessor("x", {
        header: () => t("x.label", { ns: "conductorLocationTable" }),
        cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("y", {
        header: () => t("y.label", { ns: "conductorLocationTable" }),
        cell: (info) => info.renderValue(),
    }),
    columnHelper.display({
        id: "actions",
        header: "",
        meta: {
            align: "right",
        },
        cell: RowActions,
    }),
];
