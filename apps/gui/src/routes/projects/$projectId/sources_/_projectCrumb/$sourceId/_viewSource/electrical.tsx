import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { createFileRoute } from "@tanstack/react-router";
import { UpdateSourceElectricalForm } from "~/features/sources";

export const Route = createFileRoute(
    "/projects/$projectId/sources/_projectCrumb/$sourceId/_viewSource/electrical"
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

    return (
        <Card>
            <CardHeader>
                <CardTitle>Electrical Properties</CardTitle>
            </CardHeader>
            <CardContent>
                <UpdateSourceElectricalForm sourceId={sourceId} />
            </CardContent>
        </Card>
    );
}
