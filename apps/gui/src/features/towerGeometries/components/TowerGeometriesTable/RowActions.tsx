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

import { TowerGeometry } from "./RowType";
import useModal from "~/components/modals/use-modal";
import { Modals } from "~/components/modals/config";
import { DeleteTowerGeometryModalProps } from "../DeleteTowerGeometryModal/DeleteTowerGeometryModal";
import { DeleteIcon, MenuIcon, ViewIcon } from "~/components/MenuIcons";

export default function RowActions({
    row,
}: CellContext<TowerGeometry, unknown>) {
    const deleteModal = useModal<DeleteTowerGeometryModalProps>(
        Modals.DeleteTowerGeometryModal
    );

    const displayDeleteModal = () => {
        deleteModal.open({
            geometryId: row.original.id,
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
                <DropdownMenuItem asChild>
                    <Link
                        to="/tower-geometries/$geometryId"
                        params={{ geometryId: row.original.id }}
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
