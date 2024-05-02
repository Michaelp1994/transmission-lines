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
import type { TransmissionTower } from "./RowType";
import {
    DeleteIcon,
    EditIcon,
    MenuIcon,
    ViewIcon,
} from "~/components/MenuIcons";
import { useDeleteTowerModal, useUpdateTowerModal } from "~/utils/modals";

export default function RowActions({
    row,
}: CellContext<TransmissionTower, unknown>) {
    const displayUpdateModal = useUpdateTowerModal(row.original.id);
    const displayDeleteModal = useDeleteTowerModal(row.original.id);

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
                <DropdownMenuItem onClick={displayUpdateModal}>
                    <EditIcon />
                    <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={displayDeleteModal}>
                    <DeleteIcon />
                    <span>Delete</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
