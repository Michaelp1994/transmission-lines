import { styled } from "@linaria/react";
import {
    Card,
    CardContent,
    CardHeader,
    CardHeaderText,
    CardTitle,
} from "@repo/ui";
import { createFileRoute } from "@tanstack/react-router";

interface HomePageProps {}

export const HomePage: React.FC<HomePageProps> = () => (
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

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const Route = createFileRoute("/")({
    component: HomePage,
});
