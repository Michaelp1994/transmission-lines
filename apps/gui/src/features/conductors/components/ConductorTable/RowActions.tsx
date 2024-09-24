import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@repo/ui/dropdown-menu";
import { Button } from "@repo/ui/button";
import type { CellContext } from "@tanstack/react-table";
import type { Conductor } from "./RowType";
import { DeleteIcon, MenuIcon, ViewIcon } from "~/components/MenuIcons";
import NiceModal from "@ebay/nice-modal-react";

export default function RowActions({ row }: CellContext<Conductor, unknown>) {
    function showUpdateModal() {
        NiceModal.show("update-conductor", {
            conductorId: row.original.id,
        });
    }

    function showDeleteModal() {
        NiceModal.show("delete-conductor", {
            conductorId: row.original.id,
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
                <DropdownMenuItem onClick={showUpdateModal}>
                    <ViewIcon />
                    <span>View</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={showDeleteModal}>
                    <DeleteIcon />
                    <span>Delete</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
