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
import { Eye, MoreHorizontal, Pencil } from "lucide-react";

interface RowActionsProps {
    row: any;
}

const RowActions: React.FC<RowActionsProps> = ({ row }) => (
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
                    to="/projects/$projectId"
                    params={{ projectId: row.original.id }}
                >
                    <ViewIcon />
                    View
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <Link
                    to="/projects/$projectId"
                    params={{ projectId: row.original.id }}
                >
                    <EditIcon />
                    Edit
                </Link>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
);

const EditIcon = styled(Pencil)`
    margin-right: 0.5rem;
    width: 1rem;
    height: 1rem;
`;

const ViewIcon = styled(Eye)`
    margin-right: 0.5rem;
    width: 1rem;
    height: 1rem;
`;

export default RowActions;