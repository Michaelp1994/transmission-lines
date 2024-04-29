import React from "react";
import { useTranslation } from "react-i18next";

import ConductorTypeSelect from "./ConductorTypeSelect";

import trpc from "~/utils/trpc";

interface DataWrapperProps {}

const DataWrapper = React.forwardRef<HTMLButtonElement, DataWrapperProps>(
    ({ ...props }, ref) => {
        const { data, error, isLoading } = trpc.conductorType.getAll.useQuery();
        const { t } = useTranslation("conductorType");

        if (isLoading) {
            return <div>{t("general:loading")}</div>;
        }
        if (error || !data) {
            return <div>{t("general:errorMessage")}</div>;
        }
        return <ConductorTypeSelect {...props} data={data} ref={ref} />;
    }
);

export default DataWrapper;
