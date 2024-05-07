import type { UserEvent } from "@testing-library/user-event";
import { within } from "~test-utils";

export default async function completeForm(
    user: UserEvent,
    form: HTMLElement,
    labels: Record<string, RegExp>,
    data: Record<string, unknown>
) {
    for await (const [key, label] of Object.entries(labels)) {
        if (typeof data[key] === "boolean") {
            const checkbox = within(form).getByLabelText(label);

            if (
                data[key] !==
                Boolean(
                    checkbox.attributes.getNamedItem("data-state")?.value ===
                        "checked"
                )
            ) {
                const input = within(form).getByLabelText(label);

                await user.click(input);
            }
        } else {
            const value = String(data[key]);
            const input = within(form).getByLabelText(label);

            await user.clear(input);
            await user.type(input, value);
        }
    }
}
