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

import { Project } from "./RowType";
import { DeleteProjectModalProps } from "../DeleteProjectModal/DeleteProjectModal";

import { DeleteIcon, MenuIcon, ViewIcon } from "~/components/MenuIcons";
import { Modals } from "~/components/modals/config";
import useModal from "~/components/modals/use-modal";

export default function RowActions({ row }: CellContext<Project, unknown>) {
    const deleteModal = useModal<DeleteProjectModalProps>(
        Modals.DeleteProjectModal
    );

    const displayDeleteModal = () => {
        deleteModal.open({
            projectId: row.original.id,
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
                        to="/projects/$projectId"
                        params={{ projectId: row.original.id }}
                    >
                        <ViewIcon />
                        View
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={displayDeleteModal}>
                    <DeleteIcon />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
