import type React from "react";

export function StyledForm({ children }: React.PropsWithChildren) {
    return (
        <form className="flex flex-col gap-6" aria-label="form">
            {children}
        </form>
    );
}

export function ButtonsWrapper({ children }: React.PropsWithChildren) {
    return <div className="flex gap-4 justify-end">{children}</div>;
}
