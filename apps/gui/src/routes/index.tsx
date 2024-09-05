import {
    Card,
    CardContent,
    CardHeader,
    CardHeaderText,
    CardTitle,
} from "@repo/ui";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
    component: HomePage,
});

export default function HomePage() {
    return (
        <Card>
            <CardHeader>
                <CardHeaderText>
                    <CardTitle>Home</CardTitle>
                </CardHeaderText>
            </CardHeader>
            <CardContent />
        </Card>
    );
}
