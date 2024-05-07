import type { UserEvent } from "@testing-library/user-event";
import { type Matcher, within, screen } from "../utils/test-utils";

export default async function selectAction(
    user: UserEvent,
    form: HTMLElement,
    label: Matcher,
    selection: string
) {
    const combobox = within(form).getByLabelText(label);

    if (combobox.textContent === selection) {
        return;
    }
    await user.click(combobox);
    const dialog = await screen.findByRole("dialog");
    const toSourceOptn = within(dialog).getByText(selection);

    await user.click(toSourceOptn);
}
