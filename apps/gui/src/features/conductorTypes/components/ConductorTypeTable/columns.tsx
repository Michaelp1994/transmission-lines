import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { RouterOutputs } from "@/utils/trpc";

import ConductorTypeTableActions from "./ConductorTypeTableActions";

export type ConductorType = RouterOutputs["conductorType"]["getAll"][number];

const columnHelper = createColumnHelper<ConductorType>();

const useColumns = () => {
    const { t } = useTranslation("conductorType");
    return useMemo(
        () => [
            columnHelper.accessor("name", {
                header: () => t("name.label"),
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("outerDiameter", {
                header: () => t("outerDiameter.label"),
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("acResistance75", {
                header: () => t("acResistance75.label"),
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("gmr", {
                header: () => t("gmr.label"),
                cell: (info) => info.getValue(),
            }),
            columnHelper.display({
                id: "id",
                header: "",
                meta: {
                    align: "right",
                },
                cell: (props) => <ConductorTypeTableActions row={props.row} />,
            }),
        ],
        [t]
    );
};

export default useColumns;
