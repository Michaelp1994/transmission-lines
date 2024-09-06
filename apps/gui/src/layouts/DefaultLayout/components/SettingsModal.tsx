import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@repo/ui/dialog";
import { Button } from "@repo/ui/button";
import { DropdownMenuItem, DropdownMenuShortcut } from "@repo/ui/dropdown-menu";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function SettingsModal() {
    const { t } = useTranslation("generateConductors");
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <DropdownMenuItem>
                    Settings
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t("modalTitle")}</DialogTitle>
                    <DialogDescription>
                        {t("modalDescription")} {"  "}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
