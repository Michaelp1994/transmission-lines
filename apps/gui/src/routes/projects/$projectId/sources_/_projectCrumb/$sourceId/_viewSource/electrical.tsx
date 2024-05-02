import {
    Card,
    CardContent,
    CardHeader,
    CardHeaderText,
    CardTitle,
} from "@repo/ui";
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
                <CardHeaderText>
                    <CardTitle>Electrical Properties</CardTitle>
                </CardHeaderText>
            </CardHeader>
            <CardContent>
                <UpdateSourceElectricalForm sourceId={sourceId} />
            </CardContent>
        </Card>
    );
}
