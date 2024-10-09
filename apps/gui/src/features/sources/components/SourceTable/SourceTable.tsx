import { useTranslation } from "react-i18next";

import DataTable from "~/components/DataTable";
import trpc from "~/utils/trpc";

import columns from "./columns";

// interface SourceTableProps {}

export default function SourceTable() {
    const { t } = useTranslation("sourceTable");
    const { data, isError, isLoading } = trpc.source.getAll.useQuery({});

    if (isLoading) {
        return <div>{t("general:loading")}</div>;
    }
    if (isError || !data) {
        return <div>{t("general:errorMessage")}</div>;
    }

    return <DataTable columns={columns} data={data} />;
}
