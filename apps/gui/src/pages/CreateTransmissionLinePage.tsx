import { styled } from "@linaria/react";
import {
    Card,
    CardContent,
    CardHeader,
    CardHeaderText,
    CardTitle,
} from "@repo/ui";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { AddTransmissionLineForm } from "@/features/transmissionLines";
import ROUTES from "@/router/routes";

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
