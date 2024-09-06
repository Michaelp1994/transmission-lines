export function StyledForm({ children }: React.PropsWithChildren) {
    return (
        <form className="flex flex-col gap-6" aria-label="form">
            {children}
        </form>
    );
}

export function ButtonsWrapper() {
    return <div className="flex gap-4 justify-end" />;
}
