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
import { Delete, Eye, MoreHorizontal } from "lucide-react";
import React from "react";

import { ConductorLocation } from "./type";
import { DeleteConductorLocationModalProps } from "../DeleteConductorLocationModal/DeleteConductorLocationModal";
import { UpdateConductorLocationModalProps } from "../UpdateConductorLocationModal/UpdateConductorLocationModal";

import { Modals } from "@/components/modals/config";
import useModal from "@/components/modals/use-modal";

const RowActions: React.FC<CellContext<ConductorLocation, number>> = ({
    row,
}) => {
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
                    <MoreHorizontal className="h-4 w-4" />
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
};

const ViewIcon = styled(Eye)`
    margin-right: 0.5rem;
    width: 1rem;
    height: 1rem;
`;

const DeleteIcon = styled(Delete)`
    margin-right: 0.5rem;
    width: 1rem;
    height: 1rem;
`;
export default RowActions;
