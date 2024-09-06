import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@repo/ui/card";
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
                <CardTitle>General</CardTitle>
                <CardDescription>
                    General information about the transmission line.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <UpdateTransmissionLineForm lineId={lineId} />
            </CardContent>
        </Card>
    );
}
