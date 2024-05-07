import { useTranslation } from "react-i18next";
import columns from "./columns";
import DataTable from "~/components/DataTable";
import trpc from "~/utils/trpc";

interface TowerTableProps {
    lineId: string;
}

export default function TowerTable({ lineId }: TowerTableProps) {
    const { t } = useTranslation("transmissionLine");
    const { data, isError, isLoading } = trpc.tower.getAllByLineId.useQuery({
        lineId,
    });

    if (isLoading) {
        return <div>{t("general:loading")}</div>;
    }
    if (isError || !data) {
        return <div>{t("general:errorMessage")}</div>;
    }

    return <DataTable data={data} columns={columns} />;
}
