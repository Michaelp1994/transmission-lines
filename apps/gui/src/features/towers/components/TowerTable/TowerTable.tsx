import { styled } from "@linaria/react";
import React from "react";
import { useTranslation } from "react-i18next";

import columns from "./columns";

import DataTable from "@/components/DataTable";
import trpc from "@/utils/trpc";

interface TowerTableProps {
    lineId: string;
}

const TowerTable: React.FC<TowerTableProps> = ({ lineId }) => {
    const { t } = useTranslation("transmissionLine");
    const { data, error, isLoading } = trpc.tower.getAllByLineId.useQuery({
        lineId,
    });

    if (error) {
        return <div>{t("general:errorMessage")}</div>;
    }
    if (isLoading) {
        return <div>{t("general:loading")}</div>;
    }
    return <DataTable data={data} columns={columns} />;
};

export default TowerTable;
