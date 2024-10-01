import { Button } from "@repo/ui/button";
import { Link } from "@tanstack/react-router";
import { CircleX, FolderOpen, PlusCircle, Save, SaveAll } from "lucide-react";
import trpc from "~/utils/trpc";

export default function HomePageMenu() {
    const utils = trpc.useUtils();
    const { data, error, isLoading, isError } =
        trpc.project.getProject.useQuery({});
    const openMutation = trpc.project.open.useMutation();
    const saveMutation = trpc.project.save.useMutation();
    const saveAsMutation = trpc.project.saveAs.useMutation();
    const closeMutation = trpc.project.close.useMutation({
        async onSuccess() {
            await utils.project.getProject.invalidate();
        },
    });
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
            <Button
                variant="outline"
                className="h-24 w-24 flex flex-col items-center justify-center text-center p-2"
                asChild
                disabled={!!data}
            >
                <Link to="/projects/new">
                    <PlusCircle className="h-8 w-8 mb-2" />
                    <span className="text-xs">New</span>
                </Link>
            </Button>
            <Button
                variant="outline"
                className="h-24 w-24 flex flex-col items-center justify-center text-center p-2"
                onClick={() => openMutation.mutateAsync()}
                disabled={!!data}
            >
                <FolderOpen className="h-8 w-8 mb-2" />
                <span className="text-xs">Open</span>
            </Button>
            <Button
                disabled={!data}
                variant="outline"
                className="h-24 w-24 flex flex-col items-center justify-center text-center p-2"
                onClick={() => saveMutation.mutateAsync()}
            >
                <Save className="h-8 w-8 mb-2" />
                <span className="text-xs">Save</span>
            </Button>
            <Button
                disabled={!data}
                variant="outline"
                className="h-24 w-24 flex flex-col items-center justify-center text-center p-2"
                onClick={() => saveAsMutation.mutateAsync()}
            >
                <SaveAll className="h-8 w-8 mb-2" />
                <span className="text-xs">Save As...</span>
            </Button>
            <Button
                disabled={!data}
                variant="outline"
                className="h-24 w-24 flex flex-col items-center justify-center text-center p-2"
                onClick={() => closeMutation.mutateAsync()}
            >
                <CircleX className="h-8 w-8 mb-2" />
                <span className="text-xs">Close</span>
            </Button>
        </div>
    );
}
