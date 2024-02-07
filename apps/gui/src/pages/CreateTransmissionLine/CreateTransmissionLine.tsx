import { Link } from "react-router-dom";
import { styled } from "@linaria/react";
import { useTranslation } from "react-i18next";
import {
    Card,
    CardHeader,
    CardHeaderText,
    CardTitle,
    CardContent,
} from "@repo/ui";
import ROUTES from "@/router/routes";
import { AddTransmissionLineForm } from "@/features/transmissionLines";

interface Props {}

const CreateTransmissionLine: React.FC<Props> = () => {
    const { t } = useTranslation("transmissionLine");

    return (
        <Wrapper>
            <Link to={ROUTES.PROJECT.path}>{t("general:goBack")}</Link>
            <Card>
                <CardHeader>
                    <CardHeaderText>
                        <CardTitle>{t("add.title")}</CardTitle>
                    </CardHeaderText>
                </CardHeader>
                <CardContent>
                    <AddTransmissionLineForm />
                </CardContent>
            </Card>
        </Wrapper>
    );
};

export default CreateTransmissionLine;

const Wrapper = styled.div`
    padding-bottom: 2rem;
`;
