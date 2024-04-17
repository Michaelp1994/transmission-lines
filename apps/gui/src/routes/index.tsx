import { styled } from "@linaria/react";
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
        <PageWrapper>
            <Card>
                <CardHeader>
                    <CardHeaderText>
                        <CardTitle>Home</CardTitle>
                    </CardHeaderText>
                </CardHeader>
                <CardContent />
            </Card>
        </PageWrapper>
    );
}

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;
