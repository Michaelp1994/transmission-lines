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

import { AddTowerGeometryForm } from "@/features/towerGeometries";
import ROUTES from "@/router/routes";

interface Props {}

const CreateTowerGeometryPage: React.FC<Props> = () => {
    const { t } = useTranslation("towerGeometry");

    return (
        <Wrapper>
            <Link to={ROUTES.ALL_TOWER_GEOMETRIES.path}>
                {t("general:goBack")}
            </Link>
            <Card>
                <CardHeader>
                    <CardHeaderText>
                        <CardTitle>{t("add.title")}</CardTitle>
                    </CardHeaderText>
                </CardHeader>
                <CardContent>
                    <AddTowerGeometryForm />
                </CardContent>
            </Card>
        </Wrapper>
    );
};

const Wrapper = styled.div``;

export default CreateTowerGeometryPage;
