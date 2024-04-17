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

import { TransmissionLine } from "./RowType";

import { DeleteIcon, EditIcon, MenuIcon } from "@/components/MenuIcons";

export default function ConductorTableRowActions({
    row,
}: CellContext<TransmissionLine, unknown>) {
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
                        to="/projects/$projectId/lines/$lineId"
                        params={{
                            projectId: row.original.projectId,
                            lineId: row.original.id,
                        }}
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
}
