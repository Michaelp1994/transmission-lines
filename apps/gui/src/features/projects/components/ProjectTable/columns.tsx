import { createColumnHelper } from "@tanstack/react-table";
import { t } from "i18next";

import RowActions from "./RowActions";

import { RouterOutputs } from "@/utils/trpc";

type Project = RouterOutputs["project"]["getAll"][number];

const columnHelper = createColumnHelper<Project>();

const columns = [
    columnHelper.accessor("name", {
        header: () => t("name.label", { ns: "projectTable" }),
        cell: (info) => info.getValue(),
    }),
    columnHelper.display({
        id: "id",
        header: "",
        meta: {
            align: "right",
        },
        cell: (props) => <RowActions row={props.row} />,
    }),
];

export default columns;
