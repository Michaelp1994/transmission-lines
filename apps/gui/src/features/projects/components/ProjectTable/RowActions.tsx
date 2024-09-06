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
import type { Project } from "./RowType";
import { DeleteIcon, MenuIcon, ViewIcon } from "~/components/MenuIcons";
import { useDeleteProjectModal } from "~/utils/modals";

export default function RowActions({ row }: CellContext<Project, unknown>) {
    const displayDeleteModal = useDeleteProjectModal(row.original.id);

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
                        to="/projects/$projectId"
                        params={{ projectId: row.original.id }}
                    >
                        <ViewIcon />
                        View
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={displayDeleteModal}>
                    <DeleteIcon />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
