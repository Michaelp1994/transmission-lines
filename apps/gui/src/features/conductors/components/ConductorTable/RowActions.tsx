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
import { CellContext } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import React from "react";

import { Conductor } from "./RowType";
import { DeleteConductorModalProps } from "../DeleteConductorModal/DeleteConductorModal";
import { UpdateConductorModalProps } from "../UpdateConductorModal/UpdateConductorModal";

import { Modals } from "@/components/modals/config";
import useModal from "@/components/modals/use-modal";

const RowActions: React.FC<CellContext<Conductor, number>> = ({ row }) => {
    const updateModal = useModal<UpdateConductorModalProps>(
        Modals.UpdateConductorModal
    );
    const deleteModal = useModal<DeleteConductorModalProps>(
        Modals.DeleteConductorModal
    );

    const displayUpdateModal = () => {
        updateModal.open({
            lineId: row.original.lineId,
            conductorId: row.original.id,
            onClose: updateModal.close,
        });
    };
    const displayDeleteModal = () => {
        deleteModal.open({
            lineId: row.original.lineId,
            conductorId: row.original.id,
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
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
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
};

const EditIcon = styled(Pencil)`
    margin-right: 0.5rem;
    width: 1rem;
    height: 1rem;
`;

const DeleteIcon = styled(Trash2)`
    margin-right: 0.5rem;
    width: 1rem;
    height: 1rem;
`;
export default RowActions;
