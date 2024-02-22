import * as React from "react";

import { Input } from "./input";

export interface NumberInputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value"> {
    value: any;
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
    ({ value, type, onChange, ...props }, ref) => (
        <Input
            type="number"
            ref={ref}
            value={Number.isNaN(value) || value === 0 ? "" : value.toString()}
            onChange={(e) => {
                const output = parseInt(e.target.value, 10) as any;
                const newEvent = {
                    ...e,
                    target: {
                        ...e.target,
                        value: Number.isNaN(output) ? 0 : output,
                    },
                };
                onChange?.(newEvent);
            }}
            {...props}
        />
    )
);
NumberInput.displayName = "NumberInput";

export { NumberInput };
