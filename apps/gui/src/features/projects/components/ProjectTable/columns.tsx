import { Link } from "@tanstack/react-router";
import { createColumnHelper } from "@tanstack/react-table";
import { t } from "i18next";
import RowActions from "./RowActions";
import type { Project } from "./RowType";

const columnHelper = createColumnHelper<Project>();

const columns = [
    columnHelper.accessor("name", {
        header: () => t("name.label", { ns: "projectTable" }),
        cell: (props) => 
            { return <Link
                to="/projects/$projectId"
                params={{ projectId: props.row.original.id }}
            >
                {props.getValue()}
            </Link> }
        ,
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

export default columns;
