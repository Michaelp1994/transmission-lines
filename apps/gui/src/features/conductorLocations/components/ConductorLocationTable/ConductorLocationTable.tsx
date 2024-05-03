import type { GeometryID } from "@repo/validators/Ids";
import { useTranslation } from "react-i18next";
import columns from "./columns";
import DataTable from "~/components/DataTable";
import trpc from "~/utils/trpc";

interface ConductorLocationTableProps {
    geometryId: GeometryID;
}

export default function ConductorLocationTable({
    geometryId,
}: ConductorLocationTableProps) {
    const { t } = useTranslation("conductorLocationTable");
    const {
        data = [],
        error,
        isLoading,
    } = trpc.conductorLocations.getAllByGeometryId.useQuery({ geometryId });

    if (error) {
        return <div>{t("general:errorMessage")}</div>;
    }
    if (isLoading) {
        return <div>{t("general:loading")}</div>;
    }

    return <DataTable data={data} columns={columns} />;
}
