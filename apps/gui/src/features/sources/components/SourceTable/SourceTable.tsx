import { useTranslation } from "react-i18next";
import columns from "./columns";
import DataTable from "~/components/DataTable";
import trpc from "~/utils/trpc";

interface SourceTableProps {
    projectId: string;
}

export default function SourceTable({ projectId }: SourceTableProps) {
    const { t } = useTranslation("transmissionLine");
    const { data, error, isLoading } = trpc.source.getAllByProjectId.useQuery({
        projectId,
    });

    if (error) {
        return <div>{t("general:errorMessage")}</div>;
    }
    if (isLoading) {
        return <div>{t("general:loading")}</div>;
    }

    return <DataTable data={data} columns={columns} />;
}
