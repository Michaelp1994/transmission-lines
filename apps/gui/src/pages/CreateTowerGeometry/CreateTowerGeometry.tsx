import { styled } from "@linaria/react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
    Card,
    CardHeader,
    CardHeaderText,
    CardTitle,
    CardContent,
} from "@repo/ui";
import { AddTowerGeometryForm } from "@/features/towerGeometries";
import ROUTES from "@/router/routes";

interface Props {}

const CreateTowerGeometry: React.FC<Props> = () => {
    const { t } = useTranslation("towerGeometry");

    return (
        <Wrapper>
            <Link to={ROUTES.TOWER_GEOMETRIES.path}>{t("general:goBack")}</Link>
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

export default CreateTowerGeometry;
