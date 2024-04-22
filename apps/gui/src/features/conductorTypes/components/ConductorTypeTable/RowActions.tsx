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

import { ConductorType } from "./RowType";

import { DeleteIcon, MenuIcon, ViewIcon } from "~/components/MenuIcons";

export default function ConductorTypeTableActions({
    row,
}: CellContext<ConductorType, unknown>) {
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
                        to="/conductor-types/$typeId"
                        params={{ typeId: row.original.id }}
                    >
                        <ViewIcon />
                        View
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <DeleteIcon />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
