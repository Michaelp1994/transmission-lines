import { Button } from "@repo/ui/button";
import { Link } from "@tanstack/react-router";
import { CircleX, FolderOpen, PlusCircle, Save, SaveAll } from "lucide-react";

import trpc from "~/utils/trpc";

export default function HomePageMenu() {
    const utils = trpc.useUtils();
    const { data } = trpc.project.hasProject.useQuery();
    const openMutation = trpc.project.open.useMutation({
        onSuccess() {
            utils.project.hasProject.invalidate();
        },
    });
    const saveMutation = trpc.project.save.useMutation();
    const saveAsMutation = trpc.project.saveAs.useMutation();
    const closeMutation = trpc.project.close.useMutation({
        async onSuccess() {
            await utils.project.hasProject.invalidate();
        },
    });
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
            <Button
                asChild
                className="h-24 w-24 flex flex-col items-center justify-center text-center p-2"
                disabled={!!data}
                variant="outline"
            >
                <Link to="/project/new">
                    <PlusCircle className="h-8 w-8 mb-2" />
                    <span className="text-xs">New</span>
                </Link>
            </Button>
            <Button
                className="h-24 w-24 flex flex-col items-center justify-center text-center p-2"
                disabled={!!data}
                onClick={() => openMutation.mutateAsync()}
                variant="outline"
            >
                <FolderOpen className="h-8 w-8 mb-2" />
                <span className="text-xs">Open</span>
            </Button>
            <Button
                className="h-24 w-24 flex flex-col items-center justify-center text-center p-2"
                disabled={!data}
                onClick={() => saveMutation.mutateAsync()}
                variant="outline"
            >
                <Save className="h-8 w-8 mb-2" />
                <span className="text-xs">Save</span>
            </Button>
            <Button
                className="h-24 w-24 flex flex-col items-center justify-center text-center p-2"
                disabled={!data}
                onClick={() => saveAsMutation.mutateAsync()}
                variant="outline"
            >
                <SaveAll className="h-8 w-8 mb-2" />
                <span className="text-xs">Save As...</span>
            </Button>
            <Button
                className="h-24 w-24 flex flex-col items-center justify-center text-center p-2"
                disabled={!data}
                onClick={() => closeMutation.mutateAsync()}
                variant="outline"
            >
                <CircleX className="h-8 w-8 mb-2" />
                <span className="text-xs">Close</span>
            </Button>
        </div>
    );
}
