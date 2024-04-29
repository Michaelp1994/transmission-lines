import { UserEvent } from "@testing-library/user-event";

import { screen } from "~test-utils";

export default async function completeForm(
    user: UserEvent,
    labels: Record<string, RegExp>,
    data: Record<string, unknown>
) {
    for await (const [property, label] of Object.entries(labels)) {
        const key = property as keyof typeof data;
        const value = String(data[key]);
        const input = screen.getByLabelText(label);
        await user.clear(input);
        await user.type(input, value);
    }
}
