import { createColumnHelper } from "@tanstack/react-table";
import { t } from "i18next";

import RowActions from "./RowActions";

import { RouterOutputs } from "@/utils/trpc";

type ConductorLocation = RouterOutputs["conductorLocations"]["getAll"][number];

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
        id: "id",
        header: "",
        meta: {
            align: "right",
        },
        cell: RowActions,
    }),
];
