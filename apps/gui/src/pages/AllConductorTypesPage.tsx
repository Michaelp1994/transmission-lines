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

import { ConductorTypeTable } from "@/features/conductorTypes";
import ROUTES from "@/router/routes";

interface Props {}

const AllConductorTypesPage: React.FC<Props> = () => {
    const { t } = useTranslation("conductors");

    return (
        <Wrapper>
            <Card>
                <CardHeader>
                    <CardHeaderText>
                        <CardTitle>Conductor Types</CardTitle>
                        <CardDescription>
                            Conductor types in the database
                        </CardDescription>
                    </CardHeaderText>
                    <CardHeaderActions>
                        <Button asChild>
                            <Link to={ROUTES.CREATE_CONDUCTOR_TYPE.path}>
                                {t("add.buttonText")}
                            </Link>
                        </Button>
                    </CardHeaderActions>
                </CardHeader>
                <CardContent>
                    <ConductorTypeTable />
                </CardContent>
            </Card>
        </Wrapper>
    );
};

const Wrapper = styled.div``;

export default AllConductorTypesPage;
