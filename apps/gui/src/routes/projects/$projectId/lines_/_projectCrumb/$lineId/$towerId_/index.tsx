import {
    Button,
    Card,
    CardContent,
    CardHeader,
    CardHeaderActions,
    CardHeaderText,
    CardTitle,
} from "@repo/ui";
import { createFileRoute } from "@tanstack/react-router";
import { ClipboardCopy } from "lucide-react";
import MatrixTable from "~/components/MatrixTable/MatrixTable";
import trpc from "~/utils/trpc";

async function copyToClipboard(matrix: number[][]) {
    const matrixString = matrix.map((row) => row.join("\t")).join("\n");

    await navigator.clipboard.writeText(matrixString);
}

export const Route = createFileRoute(
    "/projects/$projectId/lines/_projectCrumb/$lineId/$towerId/"
)({
    component: LineParametersPage,
    beforeLoad: () => {
        return {
            text: "Line Parameter Page",
        };
    },
});

export default function LineParametersPage() {
    const { towerId } = Route.useParams();
    const { data, isLoading, isError, error } =
        trpc.tower.getParameters.useQuery({ towerId });

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardHeaderText>
                        <CardTitle>R Matrix</CardTitle>
                    </CardHeaderText>
                    <CardHeaderActions>
                        <Button
                            size="icon"
                            variant="secondary"
                            type="button"
                            onClick={() => copyToClipboard(data.rMatrix)}
                        >
                            <ClipboardCopy />
                        </Button>
                    </CardHeaderActions>
                </CardHeader>
                <CardContent>
                    <MatrixTable data={data.rMatrix} />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardHeaderText>
                        <CardTitle>X Matrix</CardTitle>
                    </CardHeaderText>
                    <CardHeaderActions>
                        <Button
                            size="icon"
                            variant="secondary"
                            type="button"
                            onClick={() => copyToClipboard(data.xMatrix)}
                        >
                            <ClipboardCopy />
                        </Button>
                    </CardHeaderActions>
                </CardHeader>
                <CardContent>
                    <MatrixTable data={data.xMatrix} />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardHeaderText>
                        <CardTitle>C Matrix</CardTitle>
                    </CardHeaderText>
                    <CardHeaderActions>
                        <Button
                            size="icon"
                            variant="secondary"
                            type="button"
                            onClick={() => copyToClipboard(data.cMatrix)}
                        >
                            <ClipboardCopy />
                        </Button>
                    </CardHeaderActions>
                </CardHeader>
                <CardContent>
                    <MatrixTable data={data.cMatrix} />
                </CardContent>
            </Card>
        </div>
    );
}
