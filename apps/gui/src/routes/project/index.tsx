import { Button } from "@repo/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@repo/ui/tooltip";
import { createFileRoute } from "@tanstack/react-router";
import { SquareTerminal, Bot, Code2, Book, Settings2 } from "lucide-react";
import trpc from "~/utils/trpc";

export const Route = createFileRoute("/project/")({
    component: ProjectPage,
});

export default function ProjectPage() {
    const { data, isLoading, isError } = trpc.project.getProject.useQuery({});

    return (
        <nav className="grid gap-1 p-2">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-lg bg-muted"
                        aria-label="Playground"
                    >
                        <SquareTerminal className="size-5" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                    Playground
                </TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-lg"
                        aria-label="Models"
                    >
                        <Bot className="size-5" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                    Models
                </TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-lg"
                        aria-label="API"
                    >
                        <Code2 className="size-5" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                    API
                </TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-lg"
                        aria-label="Documentation"
                    >
                        <Book className="size-5" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                    Documentation
                </TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-lg"
                        aria-label="Settings"
                    >
                        <Settings2 className="size-5" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                    Settings
                </TooltipContent>
            </Tooltip>
        </nav>
    );
}
