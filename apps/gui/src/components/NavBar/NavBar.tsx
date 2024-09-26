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
        <div className="flex justify-between items-center gap-4 px-4 py-2 border-b bg-background">
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
                            to="/project"
                            draggable={false}
                            className={navigationMenuTriggerStyle()}
                        >
                            {t("project")}
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
            </div>
        </div>
    );
}
