import { styled } from "@linaria/react";
import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@repo/ui";
import { CircleUser } from "lucide-react";
import SettingsModal from "./SettingsModal";

export default function UserButton() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {/* <StyledButton variant="ghost">
                <Avatar asChild>
                    <UserIcon />
                </Avatar>
            </StyledButton> */}
                <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full"
                >
                    <CircleUser className="h-5 w-5" />
                    <span className="sr-only">Toggle user menu</span>
                </Button>
            </DropdownMenuTrigger>
            <UserMenu forceMount align="end">
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            shadcn
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            m@example.com
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        Profile
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Billing
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <SettingsModal />
                    <DropdownMenuItem>New Team</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </UserMenu>
        </DropdownMenu>
    );
}

const UserMenu = styled(DropdownMenuContent)`
    width: 14rem;
`;
