import { Link } from "react-router-dom";
import { Info } from "lucide-react";
import { Button } from "@repo/ui";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

import { createColumnHelper } from "@tanstack/react-table";
import DataTable from "@/components/DataTable";
import ROUTES from "@/router/routes";
import trpc from "@/utils/trpc";
import type { ConductorType } from "@repo/validators/schemas/ConductorType.schema";

const columnHelper = createColumnHelper<ConductorType>();

interface EditButtonProps {
    id: number;
}

const EditButton: React.FC<EditButtonProps> = ({ id }) => (
    <Button asChild variant="ghost" size="icon">
        <Link to={ROUTES.UPDATE_CONDUCTOR_TYPE.buildPath({ id })}>
            <Info />
        </Link>
    </Button>
);

interface Props {}

const ConductorTable: React.FC<Props> = () => {
    const { data, isLoading, error } = trpc.conductorType.getAll.useQuery();
    const { t } = useTranslation("conductorType");

    const columns = useMemo(
        () => [
            columnHelper.accessor("name", {
                header: () => t("name.label"),
            }),
            columnHelper.accessor("outerDiameter", {
                header: () => t("outerDiameter.label"),
            }),
            columnHelper.accessor("acResistance75", {
                header: () => t("acResistance75.label"),
            }),
            columnHelper.accessor("gmr", {
                header: () => t("gmr.label"),
            }),
            columnHelper.accessor("id", {
                header: () => t("table:actions"),
                cell: (props) => <EditButton id={props.getValue()} />,
            }),
        ],
        [t]
    );
    if (isLoading) {
        return <div>{t("general:loading")}</div>;
    }
    if (error || !data) {
        return <div>{t("general:errorMessage")}</div>;
    }
    return <DataTable data={data} columns={columns} />;
};

export default ConductorTable;
