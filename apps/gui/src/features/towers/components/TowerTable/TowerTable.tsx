import { useTranslation } from "react-i18next";

import DataTable from "~/components/DataTable";
import trpc from "~/utils/trpc";

import columns from "./columns";

interface TowerTableProps {
    lineId: string;
}

export default function TowerTable({ lineId }: TowerTableProps) {
    const { t } = useTranslation("towerTable");
    const { data, isError, isLoading } = trpc.tower.getAll.useQuery({
        lineId: lineId,
    });

    if (isLoading) {
        return <div>{t("general:loading")}</div>;
    }
    if (isError || !data) {
        return <div>{t("general:errorMessage")}</div>;
    }
    console.log(data);
    return <DataTable columns={columns} data={data} />;
}
