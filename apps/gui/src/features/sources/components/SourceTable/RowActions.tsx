import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@repo/ui";
import { Link } from "@tanstack/react-router";
import type { CellContext } from "@tanstack/react-table";
import type { Source } from "./RowType";
import { DeleteIcon, MenuIcon, ViewIcon } from "~/components/MenuIcons";
import { useDeleteSourceModal } from "~/utils/modals";

export default function SourceTableRowActions({
    row,
}: CellContext<Source, unknown>) {
    const displayDeleteModal = useDeleteSourceModal(row.original.id);

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
                        to="/projects/$projectId/sources/$sourceId"
                        params={{
                            projectId: row.original.projectId,
                            sourceId: row.original.id,
                        }}
                    >
                        <ViewIcon />
                        <span>View</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={displayDeleteModal}>
                    <DeleteIcon />
                    <span>Delete</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
