import { createColumnHelper } from "@tanstack/react-table";
import { t } from "i18next";

import type { TransmissionTower } from "./RowType";

import RowActions from "./RowActions";

const columnHelper = createColumnHelper<TransmissionTower>();

export default [
    columnHelper.accessor("name", {
        header: () => t("name.label", { ns: "conductorConfiguration" }),
        cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("resistance", {
        header: () => "Resistance",
        cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("distance", {
        header: () => "Distance",
        cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("geometry.name", {
        header: "Geometry",
        cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("id", {
        header: "",
        meta: {
            align: "right",
        },
        cell: RowActions,
    }),
];
