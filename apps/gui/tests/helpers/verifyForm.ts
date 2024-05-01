import { expect } from "vitest";

import { within } from "~test-utils";

export default async function verifyForm(
    form: HTMLElement,
    inputLabels: Record<string, RegExp>,
    values?: Record<string, unknown>
) {
    Object.entries(inputLabels).forEach(([label, labelText]) => {
        const input = within(form).getByLabelText(labelText);
        expect(input).toBeInTheDocument();
        if (values) {
            expect(input).toHaveValue(values[label]);
        }
    });
}
