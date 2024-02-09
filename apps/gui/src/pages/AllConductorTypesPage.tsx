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
    Input,
} from "@repo/ui";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import ROUTES from "@/router/routes";
import { ConductorTypeTable } from "@/features/conductorTypes";

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
                        <Button asChild variant="outline">
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
