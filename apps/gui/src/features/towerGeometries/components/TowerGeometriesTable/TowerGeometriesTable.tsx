import { Button } from "@repo/ui";
import { TowerGeometry } from "@repo/validators/schemas/TowerGeometry.schema";
import { createColumnHelper } from "@tanstack/react-table";
import { Info } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import DataTable from "@/components/DataTable";
import ROUTES from "@/router/routes";
import trpc from "@/utils/trpc";


interface Props {}

const columnHelper = createColumnHelper<TowerGeometry>();

interface EditButtonProps {
    id: number;
}

const EditButton: React.FC<EditButtonProps> = ({ id }) => {
    const navigate = useNavigate();
    function handleClick() {
        navigate(ROUTES.UPDATE_TOWER_GEOMETRY.buildPath({ id }));
    }
    return (
        <Button variant="ghost" size="icon" onClick={handleClick}>
            <Info />
        </Button>
    );
};

const GeometriesTable: React.FC<Props> = () => {
    const { t } = useTranslation("towerGeometry");
    const {
        data = [],
        error,
        isLoading,
    } = trpc.towerGeometry.getAll.useQuery();
    const columns = [
        columnHelper.accessor("name", {
            header: () => t("name.label"),
            cell: (info) => info.renderValue(),
        }),
        columnHelper.accessor("id", {
            header: () => t("table:actions"),
            cell: (props) => <EditButton id={props.getValue()} />,
        }),
    ];
    if (error) {
        return <div>{t("general:errorMessage")}</div>;
    }
    if (isLoading) {
        return <div>{t("general:loading")}</div>;
    }
    return <DataTable data={data} columns={columns} />;
};

export default GeometriesTable;
