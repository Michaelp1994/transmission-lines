import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@repo/ui";
import type { CellContext } from "@tanstack/react-table";
import type { Conductor } from "./RowType";
import { DeleteIcon, MenuIcon, ViewIcon } from "~/components/MenuIcons";
import {
    useDeleteConductorModal,
    useUpdateConductorModal,
} from "~/utils/modals";

export default function RowActions({ row }: CellContext<Conductor, unknown>) {
    const displayUpdateModal = useUpdateConductorModal(row.original.id);
    const displayDeleteModal = useDeleteConductorModal(row.original.id);

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
                <DropdownMenuItem onClick={displayUpdateModal}>
                    <ViewIcon />
                    <span>View</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={displayDeleteModal}>
                    <DeleteIcon />
                    <span>Delete</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
