import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import MatrixTable from "~/components/MatrixTable";
import trpc from "~/utils/trpc";

export const Route = createFileRoute(
    "/projects/$projectId/sources/_projectCrumb/$sourceId/_viewSource/sequence"
)({
    component: ViewSourcePage,
    beforeLoad: () => {
        return {
            text: "View Source",
        };
    },
});

export default function ViewSourcePage() {
    const { sourceId } = Route.useParams();
    const { t } = useTranslation("source");

    const { data, isLoading, isError } =
        trpc.source.getPhaseComponents.useQuery({
            id: sourceId,
        });

    if (isLoading) {
        return <div>{t("general:loading")}</div>;
    }
    if (isError) {
        return <div>{t("general:errorMessage")}</div>;
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Z Sequence Matrix</CardTitle>
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
                    <CardTitle>Z Phase Matrix</CardTitle>
                </CardHeader>
                <CardContent>
                    <MatrixTable data={data.phaseMatrix} />
                </CardContent>
            </Card>
        </>
    );
}
