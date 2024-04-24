import { styled } from "@linaria/react";
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
import { CellContext } from "@tanstack/react-table";

import { TransmissionTower } from "./RowType";
import { DeleteTowerModalProps } from "../DeleteTowerModal/DeleteTowerModal";
import { UpdateTowerModalProps } from "../UpdateTowerModal/UpdateTowerModal";

import {
    DeleteIcon,
    EditIcon,
    MenuIcon,
    ViewIcon,
} from "~/components/MenuIcons";
import { Modals } from "~/components/modals/config";
import useModal from "~/components/modals/use-modal";

export default function RowActions({
    row,
}: CellContext<TransmissionTower, unknown>) {
    const updateModal = useModal<UpdateTowerModalProps>(
        Modals.UpdateTowerModal
    );
    const deleteModal = useModal<DeleteTowerModalProps>(
        Modals.DeleteTowerModal
    );

    function displayUpdateModal() {
        updateModal.open({
            lineId: row.original.lineId,
            towerId: row.original.id,
            onClose: updateModal.close,
        });
    }
    function displayDeleteModal() {
        deleteModal.open({
            lineId: row.original.lineId,
            towerId: row.original.id,
            onClose: deleteModal.close,
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
