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
import type { TransmissionLine } from "./RowType";
import { DeleteIcon, EditIcon, MenuIcon } from "~/components/MenuIcons";
import { useDeleteTransmissionLineModal } from "~/utils/modals";

export default function ConductorTableRowActions({
    row,
}: CellContext<TransmissionLine, unknown>) {
    const displayDeleteModal = useDeleteTransmissionLineModal(row.original.id);

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
                        to="/projects/$projectId/lines/$lineId"
                        params={{
                            projectId: row.original.projectId,
                            lineId: row.original.id,
                        }}
                    >
                        <EditIcon />
                        <span>Edit</span>
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
