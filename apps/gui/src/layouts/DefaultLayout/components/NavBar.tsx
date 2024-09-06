import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@repo/ui/navigation-menu";
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
        <div>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Link
                            to="/"
                            className={navigationMenuTriggerStyle()}
                            draggable={false}
                        >
                            {t("home")}
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link
                            to="/projects"
                            draggable={false}
                            className={navigationMenuTriggerStyle()}
                        >
                            {t("projects")}
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link
                            to="/conductor-types"
                            draggable={false}
                            className={navigationMenuTriggerStyle()}
                        >
                            {t("conductorTypes")}
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link
                            to="/tower-geometries"
                            draggable={false}
                            className={navigationMenuTriggerStyle()}
                        >
                            {t("towerGeometries")}
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <div>
                <UserButton />
                {/* <Switch id="language" onCheckedChange={changeLanguage} />{" "}
                <Label htmlFor="language">{t("changeLanguage")}</Label> */}
            </div>
        </div>
    );
}
