import { styled } from "@linaria/react";
import { Button, Card } from "@repo/ui";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { ConductorTypeTable } from "@/features/conductorTypes";
import ROUTES from "@/router/routes";

interface Props {}

const Conductors: React.FC<Props> = () => {
    const { t } = useTranslation("conductors");

    return (
        <Wrapper>
            <Button asChild>
                <Link to={ROUTES.CREATE_CONDUCTOR.path}>
                    {t("add.buttonText")}
                </Link>
            </Button>
            <Card>
                <ConductorTypeTable />
            </Card>
        </Wrapper>
    );
};

const Wrapper = styled.div``;
export default Conductors;
