import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardHeaderText,
    CardTitle,
} from "@repo/ui";
import { createFileRoute } from "@tanstack/react-router";
import { UpdateTransmissionLineForm } from "~/features/transmissionLines";
import trpc from "~/utils/trpc";

export const Route = createFileRoute(
    "/projects/$projectId/lines/_projectCrumb/$lineId/_viewLine/"
)({
    component: TransmissionLineGeneral,
});

export default function TransmissionLineGeneral() {
    const { lineId } = Route.useParams();

    return (
        <Card>
            <CardHeader>
                <CardHeaderText>
                    <CardTitle>General</CardTitle>
                    <CardDescription>
                        General information about the transmission line.
                    </CardDescription>
                </CardHeaderText>
            </CardHeader>
            <CardContent>
                <UpdateTransmissionLineForm lineId={lineId} />
            </CardContent>
        </Card>
    );
}
