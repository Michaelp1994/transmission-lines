import { createColumnHelper } from "@tanstack/react-table";
import { t } from "i18next";
import { Square, SquareCheckBig } from "lucide-react";
import RowActions from "./RowActions";
import type { Conductor } from "./RowType";

const columnHelper = createColumnHelper<Conductor>();

export default [
    columnHelper.accessor("name", {
        header: () => t("name.label", { ns: "conductorConfiguration" }),
        cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("fromPhase", {
        header: () => "From Phase",
        cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("toPhase", {
        header: () => "To Phase",
        cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("bundleNumber", {
        header: "Bundle Number",
        cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("bundleSpacing", {
        header: "Bundle Spacing",
        cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("isNeutral", {
        header: "Is Neutral?",
        cell: (info) =>
            { return info.renderValue() ? (
                <SquareCheckBig aria-label="Yes" />
            ) : (
                <Square aria-label="No" />
            ) },
    }),
    columnHelper.accessor("type.name", {
        header: "Conductor Type",
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
