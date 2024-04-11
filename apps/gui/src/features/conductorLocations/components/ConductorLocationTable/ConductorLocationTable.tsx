import { GeometryID } from "@repo/validators/schemas/Ids.schema";
import React from "react";
import { useTranslation } from "react-i18next";

import columns from "./columns";

import DataTable from "@/components/DataTable";
import trpc from "@/utils/trpc";

interface ConductorLocationTableProps {
    geometryId: GeometryID;
}

const ConductorLocationTable: React.FC<ConductorLocationTableProps> = ({
    geometryId,
}) => {
    const { t } = useTranslation("towerGeometry");
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
};

export default ConductorLocationTable;
