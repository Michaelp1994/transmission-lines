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
import { useTypedParams } from "react-router-typesafe-routes/dom";

import { EditTowerGeometryForm } from "@/features/towerGeometries";
import ROUTES from "@/router/routes";

interface Props {}

const UpdateTowerGeometryPage: React.FC<Props> = () => {
    const { t } = useTranslation("towerGeometry");
    const { id } = useTypedParams(ROUTES.UPDATE_TOWER_GEOMETRY);
    return (
        <Wrapper>
            <Link to={ROUTES.ALL_TOWER_GEOMETRIES.path}>
                {t("general:goBack")}
            </Link>
            <Card>
                <CardHeader>
                    <CardHeaderText>
                        <CardTitle>{t("edit.title")}</CardTitle>
                    </CardHeaderText>
                </CardHeader>
                <CardContent>
                    <EditTowerGeometryForm id={id} />
                </CardContent>
            </Card>
        </Wrapper>
    );
};

const Wrapper = styled.div``;

export default UpdateTowerGeometryPage;
