import { type Table } from "@tanstack/react-table";
import { useState } from "react";

import { Toggle } from "../toggle";
interface DataTableViewOptionsProps<T> {
    table: Table<T>;
}

export default function DataTableEditModeButton<T>(
    props: DataTableViewOptionsProps<T>
) {
    const [checked, setChecked] = useState(false);

    return (
        <Toggle
            onPressedChange={(pressed) => {
                setChecked(pressed);
            }}
            pressed={checked}
        >
            Edit Mode
        </Toggle>
    );
}
