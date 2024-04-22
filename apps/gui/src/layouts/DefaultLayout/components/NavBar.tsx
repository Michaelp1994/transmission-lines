import { styled } from "@linaria/react";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@repo/ui";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import UserButton from "./UserButton";

export default function NavBar() {
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
                        <Link to="/" className={navigationMenuTriggerStyle()}>
                            {t("home")}
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link
                            to="/projects"
                            className={navigationMenuTriggerStyle()}
                        >
                            {t("projects")}
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link
                            to="/conductor-types"
                            className={navigationMenuTriggerStyle()}
                        >
                            {t("conductorTypes")}
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link
                            to="/tower-geometries"
                            className={navigationMenuTriggerStyle()}
                        >
                            {t("towerGeometries")}
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <RightSide>
                <UserButton />
                {/* <Switch id="language" onCheckedChange={changeLanguage} />{" "}
                <Label htmlFor="language">{t("changeLanguage")}</Label> */}
            </RightSide>
        </Wrapper>
    );
}

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
