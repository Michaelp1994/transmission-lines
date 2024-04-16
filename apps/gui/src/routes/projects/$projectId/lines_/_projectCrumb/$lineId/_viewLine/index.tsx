import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardHeaderText,
    CardTitle,
} from "@repo/ui";
import { createFileRoute } from "@tanstack/react-router";
import React from "react";

import { UpdateTransmissionLineForm } from "@/features/transmissionLines";
import trpc from "@/utils/trpc";

interface TransmissionLineGeneralProps {}

export const TransmissionLineGeneral: React.FC<
    TransmissionLineGeneralProps
> = () => {
    const { lineId } = Route.useParams();

    const { data, isLoading, isError } = trpc.transmissionLine.getById.useQuery(
        {
            id: lineId,
        }
    );

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError || !data) {
        return <div>Error...</div>;
    }

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
                <UpdateTransmissionLineForm data={data} />
            </CardContent>
        </Card>
    );
};

export const Route = createFileRoute(
    "/projects/$projectId/lines/_projectCrumb/$lineId/_viewLine/"
)({
    component: TransmissionLineGeneral,
});