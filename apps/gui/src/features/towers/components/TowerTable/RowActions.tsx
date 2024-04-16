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
import { Delete, Eye, MoreHorizontal, Pencil } from "lucide-react";
import React from "react";

import { TransmissionTower } from "./RowType";
import { DeleteTowerModalProps } from "../DeleteTowerModal/DeleteTowerModal";
import { TowerParametersModalProps } from "../TowerParametersModal/TowerParametersModal";
import { UpdateTowerModalProps } from "../UpdateTowerModal/UpdateTowerModal";

import { Modals } from "@/components/modals/config";
import useModal from "@/components/modals/use-modal";

const RowActions: React.FC<CellContext<TransmissionTower, number>> = ({
    row,
}) => {
    const updateModal = useModal<UpdateTowerModalProps>(
        Modals.UpdateTowerModal
    );
    const deleteModal = useModal<DeleteTowerModalProps>(
        Modals.DeleteTowerModal
    );
    const parametersModal = useModal<TowerParametersModalProps>(
        Modals.TowerParametersModal
    );

    const displayUpdateModal = () => {
        updateModal.open({
            lineId: row.original.lineId,
            towerId: row.original.id,
            onClose: updateModal.close,
        });
    };
    const displayDeleteModal = () => {
        deleteModal.open({
            lineId: row.original.lineId,
            towerId: row.original.id,
            onClose: deleteModal.close,
        });
    };
    const displayParametersModal = () => {
        parametersModal.open({
            towerId: row.original.id,
            onClose: parametersModal.close,
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
};

const ViewIcon = styled(Eye)`
    margin-right: 0.5rem;
    width: 1rem;
    height: 1rem;
`;

const EditIcon = styled(Pencil)`
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
