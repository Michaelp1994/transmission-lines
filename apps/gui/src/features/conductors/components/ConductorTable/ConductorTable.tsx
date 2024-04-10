import { styled } from "@linaria/react";
import React from "react";
import { useTranslation } from "react-i18next";

import columns from "./columns";

import DataTable from "@/components/DataTable";
import trpc from "@/utils/trpc";

interface Props {
    lineId: string;
}

const ConductorTable: React.FC<Props> = ({ lineId }) => {
    const { t } = useTranslation("transmissionLine");
    const { data, error, isLoading } = trpc.conductor.getAllByLineId.useQuery({
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

export default ConductorTable;
