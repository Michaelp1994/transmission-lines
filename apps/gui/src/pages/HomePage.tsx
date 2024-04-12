import { styled } from "@linaria/react";
import {
    Card,
    CardContent,
    CardHeader,
    CardHeaderText,
    CardTitle,
} from "@repo/ui";

interface Props {}

const HomePage: React.FC<Props> = () => (
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

export default HomePage;
