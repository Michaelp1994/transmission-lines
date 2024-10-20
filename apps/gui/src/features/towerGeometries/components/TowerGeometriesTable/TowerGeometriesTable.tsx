import { useTranslation } from "react-i18next";

import DataTable from "~/components/DataTable";
import trpc from "~/utils/trpc";

import columns from "./columns";

export default function GeometriesTable() {
    const { t } = useTranslation("geometriesTable");
    const {
        data = [],
        isError,
        isLoading,
    } = trpc.towerGeometry.getAll.useQuery();

    if (isError) {
        return <div>{t("general:errorMessage")}</div>;
    }
    if (isLoading) {
        return <div>{t("general:loading")}</div>;
    }

    return <DataTable columns={columns} data={data} />;
}
