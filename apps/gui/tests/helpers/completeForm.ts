import { UserEvent } from "@testing-library/user-event";

import { within } from "~test-utils";

export default async function completeForm(
    user: UserEvent,
    form: HTMLElement,
    labels: Record<string, RegExp>,
    data: Record<string, unknown>
) {
    for await (const [key, label] of Object.entries(labels)) {
        switch (typeof data[key]) {
            case "boolean": {
                const checkbox = within(form).getByLabelText(label);
                console.log(data[key]);
                console.log(checkbox.ariaChecked);
                console.log(typeof data[key]);
                console.log(typeof !!checkbox.ariaChecked);
                if (data[key] !== !!checkbox.ariaChecked) {
                    const input = within(form).getByLabelText(label);
                    await user.click(input);
                    console.log("clicked");
                }
                break;
            }
            default: {
                const value = String(data[key]);
                const input = within(form).getByLabelText(label);
                await user.clear(input);
                await user.type(input, value);
                break;
            }
        }
    }
}
