import { useTranslation } from "react-i18next";

import DataTable from "~/components/DataTable";
import trpc from "~/utils/trpc";

import columns from "./columns";

interface ConductorTableProps {
    lineId: string;
}

export default function ConductorTable({ lineId }: ConductorTableProps) {
    const { t } = useTranslation("conductorTable");
    const { data, error, isLoading } = trpc.conductor.getAll.useQuery({
        lineId,
    });

    if (isLoading) {
        return <div>{t("general:loading")}</div>;
    }

    if (error || !data) {
        return <div>{t("general:errorMessage")}</div>;
    }
    return <DataTable columns={columns} data={data} />;
}
