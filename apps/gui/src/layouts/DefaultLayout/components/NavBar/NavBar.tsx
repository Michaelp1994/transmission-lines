import { styled } from "@linaria/react";
import {
    Label,
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    Switch,
    navigationMenuTriggerStyle,
} from "@repo/ui";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import ROUTES from "@/router/routes";

interface Props {}

const NavBar: React.FC<Props> = () => {
    const { t, i18n } = useTranslation("general");
    function changeLanguage(checked: boolean) {
        if (checked) {
            i18n.changeLanguage("pt-BR");
        } else {
            i18n.changeLanguage("en-AU");
        }
    }
    return (
        <Wrapper>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Link
                            to={ROUTES.HOME.path}
                            className={navigationMenuTriggerStyle()}
                        >
                            {t("home")}
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link
                            to={ROUTES.PROJECT.path}
                            className={navigationMenuTriggerStyle()}
                        >
                            {t("project")}
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link
                            to={ROUTES.ALL_CONDUCTOR_TYPES.path}
                            className={navigationMenuTriggerStyle()}
                        >
                            {t("conductorTypes")}
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link
                            to={ROUTES.ALL_TOWER_GEOMETRIES.path}
                            className={navigationMenuTriggerStyle()}
                        >
                            {t("towerGeometries")}
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <RightSide>
                <Switch id="language" onCheckedChange={changeLanguage} />{" "}
                <Label htmlFor="language">{t("changeLanguage")}</Label>
            </RightSide>
        </Wrapper>
    );
};

const Wrapper = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    border-bottom: 1px solid hsl(var(--border));
    padding: 12px;
    background-color: white;
`;
const RightSide = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

export default NavBar;
