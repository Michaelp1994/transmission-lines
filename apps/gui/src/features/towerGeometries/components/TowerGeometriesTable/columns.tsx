import { Link } from "@tanstack/react-router";
import { createColumnHelper } from "@tanstack/react-table";
import { t } from "i18next";
import RowActions from "./RowActions";
import type { TowerGeometry } from "./RowType";

const columnHelper = createColumnHelper<TowerGeometry>();

export default [
    columnHelper.accessor("name", {
        header: () => t("name.label", { ns: "towerGeometry" }),
        cell: (info) => {
            return (
                <Link
                    draggable={false}
                    to="/tower-geometries/$geometryId"
                    params={{
                        geometryId: info.row.original.id,
                    }}
                >
                    {info.getValue()}
                </Link>
            );
        },
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
