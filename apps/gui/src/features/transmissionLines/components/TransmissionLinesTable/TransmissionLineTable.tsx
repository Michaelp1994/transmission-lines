import { useTranslation } from "react-i18next";

import DataTable from "~/components/DataTable";
import trpc from "~/utils/trpc";

import columns from "./columns";

// interface TransmissionLineTableProps {}

export default function TransmissionLineTable() {
    const { t } = useTranslation("transmissionLineTable");
    const { data, isError, isLoading } = trpc.transmissionLine.getAll.useQuery(
        {}
    );

    if (isLoading) {
        return <div>{t("general:loading")}</div>;
    }
    if (isError || !data) {
        return <div>{t("general:errorMessage")}</div>;
    }

    return <DataTable columns={columns} data={data} />;
}
