import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@repo/ui";
import { MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

import ROUTES from "@/router/routes";

interface Props {
    row: any;
}

const ConductorTypeTableActions: React.FC<Props> = ({ row }) => {
    const labels = [];
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
                <DropdownMenuItem asChild>
                    <Link
                        to={ROUTES.UPDATE_CONDUCTOR_TYPE.buildPath({
                            id: row.original.id,
                        })}
                    >
                        Edit
                    </Link>
                </DropdownMenuItem>
                {/* <DropdownMenuItem>Make a copy</DropdownMenuItem>
                <DropdownMenuItem>Favorite</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                        <DropdownMenuRadioGroup>
                            <DropdownMenuRadioItem value="Test">
                                Test
                            </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    Delete
                    <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                </DropdownMenuItem> */}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ConductorTypeTableActions;
