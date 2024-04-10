import { createColumnHelper } from "@tanstack/react-table";
import { t } from "i18next";

import RowActions from "./RowActions";

import { RouterOutputs } from "@/utils/trpc";

type TransmissionLine = RouterOutputs["transmissionLine"]["getAllByProjectId"];

const columnHelper = createColumnHelper<TransmissionLine>();
export default [
    columnHelper.accessor("name", {
        header: () => t("name.label", { ns: "conductorConfiguration" }),
        cell: (info) => info.renderValue(),
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
