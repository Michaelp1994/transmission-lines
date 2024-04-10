import { createColumnHelper } from "@tanstack/react-table";
import { t } from "i18next";

import RowActions from "./RowActions";

import { RouterOutputs } from "@/utils/trpc";

const columnHelper = createColumnHelper<TowerGeometrty>();
type TowerGeometrty = RouterOutputs["towerGeometry"]["getAll"][number];

export default [
    columnHelper.accessor("name", {
        header: () => t("name.label", { ns: "towerGeometry" }),
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
