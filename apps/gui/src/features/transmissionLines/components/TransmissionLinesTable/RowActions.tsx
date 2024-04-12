import { styled } from "@linaria/react";
import { TransmissionLine } from "@repo/db/schemas/transmissionLines";
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
import { Delete, MoreHorizontal, Pencil } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

import routes from "@/router/routes";

interface Props {}

const ConductorTableRowActions: React.FC<
    CellContext<TransmissionLine, number>
> = ({ row }) => (
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
                    to={routes.projects.View.Lines.View.buildPath({
                        projectId: row.original.projectId,
                        lineId: row.original.id,
                    })}
                >
                    <EditIcon />
                    <span>Edit</span>
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <DeleteIcon />
                <span>Delete</span>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
);

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
export default ConductorTableRowActions;
