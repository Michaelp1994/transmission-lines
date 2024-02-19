import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, onChange, ...props }, ref) => (
        <input
            type={type}
            className={cn(
                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            ref={ref}
            // FIXME: maybe create a forwardRef component that encapsulates
            // this component and returns a number instead of a string?

            onChange={(e) => {
                if (!onChange) return;
                if (type === "number") {
                    // @ts-expect-error FIXME: working only within the context of react hook forms
                    if (e.target.value === "") return onChange(null);
                    // @ts-expect-error FIXME: working only within the context of react hook forms
                    return onChange(Number(e.target.value));
                }
                onChange(e);
            }}
            {...props}
        />
    )
);
Input.displayName = "Input";

export { Input };
