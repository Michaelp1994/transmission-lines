import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@repo/ui";
import { CellContext } from "@tanstack/react-table";

import { ConductorLocation } from "./type";
import { DeleteConductorLocationModalProps } from "../DeleteConductorLocationModal/DeleteConductorLocationModal";
import { UpdateConductorLocationModalProps } from "../UpdateConductorLocationModal/UpdateConductorLocationModal";

import { DeleteIcon, MenuIcon, ViewIcon } from "@/components/MenuIcons";
import { Modals } from "@/components/modals/config";
import useModal from "@/components/modals/use-modal";

export default function RowActions({
    row,
}: CellContext<ConductorLocation, unknown>) {
    const updateModal = useModal<UpdateConductorLocationModalProps>(
        Modals.UpdateConductorLocationModal
    );
    const deleteModal = useModal<DeleteConductorLocationModalProps>(
        Modals.DeleteConductorLocationModal
    );

    const displayUpdateModal = () => {
        updateModal.open({
            conductorLocationId: row.original.id,
            onClose: updateModal.close,
        });
    };
    const displayDeleteModal = () => {
        deleteModal.open({
            conductorLocationId: row.original.id,
            onClose: deleteModal.close,
        });
    };
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
