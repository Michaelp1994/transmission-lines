import { styled } from "@linaria/react";
import {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardHeaderActions,
    CardHeaderText,
    CardTitle,
} from "@repo/ui";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { TowerGeometriesTable } from "@/features/towerGeometries";
import ROUTES from "@/router/routes";

interface Props {}

const AllTowerGeometriesPage: React.FC<Props> = () => {
    const { t } = useTranslation("towerGeometry");

    return (
        <Wrapper>
            <Card>
                <CardHeader>
                    <CardHeaderText>
                        <CardTitle>Tower Geometries</CardTitle>
                        <CardDescription>
                            Tower Geometries in the database
                        </CardDescription>
                    </CardHeaderText>
                    <CardHeaderActions>
                        <Button asChild>
                            <Link to={ROUTES.CREATE_TOWER_GEOMETRY.path}>
                                {t("add.buttonText")}
                            </Link>
                        </Button>
                    </CardHeaderActions>
                </CardHeader>
                <CardContent>
                    <TowerGeometriesTable />
                </CardContent>
            </Card>
        </Wrapper>
    );
};

const Wrapper = styled.div``;
export default AllTowerGeometriesPage;
