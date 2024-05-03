import { expect } from "vitest";
import { within } from "~test-utils";

export default function verifyTable(
    table: HTMLElement,
    columns: string[],
    data: Record<string, any>[]
) {
    const rowgroups = within(table).getAllByRole("rowgroup");

    expect(rowgroups).toHaveLength(2);
    if (!rowgroups[1]) {
        throw new Error("Table doesn't have a body");
    }
    const rows = within(rowgroups[1]).getAllByRole("row");

    expect(rows).toHaveLength(data.length);
    rows.forEach((row, rowIndex) => {
        const current = data[rowIndex];

        if (!current) {
            throw new Error("Data doesn't match the table rows");
        }
        const cells = within(row).getAllByRole("cell");

        columns.forEach((property, colIndex) => {
            const cell = cells[colIndex];

            if (!cell) {
                throw new Error("Data doesn't match the table cells");
            }

            if (property.includes(".")) {
                const value = property
                    .split(".")
                    .reduce((o, i) => o[i], current);

                expect(cell).toHaveTextContent(value);
            } else if (typeof current[property] === "boolean") {
                const value = current[property] ? /yes/i : /no/i;

                expect(within(cell).getByLabelText(value)).toBeInTheDocument();
            } else {
                expect(cell).toHaveTextContent(String(current[property]));
            }
        });
    });
}
