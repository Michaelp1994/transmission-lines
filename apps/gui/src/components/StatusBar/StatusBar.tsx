import trpc from "~/utils/trpc";

export default function StatusBar() {
    const { data, error, isLoading, isError } = trpc.meta.version.useQuery();

    return (
        <div className="flex justify-between items-center gap-4 px-4 py-2 border-t bg-background">
            <p className="text-sm text-muted-foreground">
                {new Date().getFullYear()} -{" "}
                <a
                    href="https://github.com/tauri-apps/tauri"
                    target="_blank"
                    rel="noreferrer"
                >
                    © Michael Poulgrain
                </a>
            </p>
            <p>v{data}</p>
        </div>
    );
}
