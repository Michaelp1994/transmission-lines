import {
    Card,
    CardContent,
    CardHeader,
    CardHeaderText,
    CardTitle,
} from "@repo/ui";
import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import MatrixTable from "~/components/MatrixTable";
import trpc from "~/utils/trpc";

export const ViewSourcePage = () => {
    const { sourceId } = Route.useParams();
    const { t } = useTranslation("source");

    const { data, isLoading, error } = trpc.source.getPhaseComponents.useQuery({
        id: sourceId,
    });

    if (isLoading) {
        return <div>{t("general:loading")}</div>;
    }
    if (error || !data) {
        return <div>{t("general:errorMessage")}</div>;
    }
    return (
        <>
            <Card>
                <CardHeader>
                    <CardHeaderText>
                        <CardTitle>Z Sequence Matrix</CardTitle>
                    </CardHeaderText>
                </CardHeader>
                <CardContent>
                    <div>
                        Z0: {data.z0.re} + j{data.z0.im}
                    </div>
                    <div>
                        Z1: {data.z1.re} + j{data.z1.im}
                    </div>
                    <div>
                        Z2: {data.z2.re} + j{data.z2.im}
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardHeaderText>
                        <CardTitle>Z Phase Matrix</CardTitle>
                    </CardHeaderText>
                </CardHeader>
                <CardContent>
                    <MatrixTable data={data.phaseMatrix} />
                </CardContent>
            </Card>
        </>
    );
};

export const Route = createFileRoute(
    "/projects/$projectId/sources/_projectCrumb/$sourceId/_viewSource/sequence"
)({
    component: ViewSourcePage,
    beforeLoad: () => ({
        text: "View Source",
    }),
});
