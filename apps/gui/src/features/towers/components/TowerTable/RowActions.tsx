import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@repo/ui/dropdown-menu";
import { Button } from "@repo/ui/button";
import { Link } from "@tanstack/react-router";
import type { CellContext } from "@tanstack/react-table";
import type { TransmissionTower } from "./RowType";
import {
    DeleteIcon,
    EditIcon,
    MenuIcon,
    ViewIcon,
} from "~/components/MenuIcons";
import NiceModal from "@ebay/nice-modal-react";

export default function RowActions({
    row,
}: CellContext<TransmissionTower, unknown>) {
    function showUpdateModal() {
        NiceModal.show("update-tower", {
            towerId: row.original.id,
        });
    }
    function showDeleteModal() {
        NiceModal.show("delete-tower", {
            towerId: row.original.id,
        });
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                >
                    <MenuIcon />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link
                        to="/projects/$projectId/lines/$lineId/$towerId"
                        from="/projects/$projectId/lines/$lineId"
                        params={{
                            towerId: row.original.id,
                        }}
                    >
                        <ViewIcon />
                        <span>View</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={showUpdateModal}>
                    <EditIcon />
                    <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={showDeleteModal}>
                    <DeleteIcon />
                    <span>Delete</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
