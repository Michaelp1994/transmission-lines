import type { UserEvent } from "@testing-library/user-event";
import { screen, within } from "~test-utils";

export interface FormStructure {
    [key: string]: {
        label: RegExp;
        type: "text" | "boolean" | "select";
    };
}

const formData: FormStructure = {
    name: {
        label: /name/i,
        type: "text",
    },
    fromPhase: {
        label: /from phase/i,
        type: "text",
    },
    toPhase: {
        label: /to phase/i,
        type: "text",
    },
    bundleNumber: {
        label: /bundle number/i,
        type: "text",
    },
    bundleSpacing: {
        label: /bundle spacing/i,
        type: "text",
    },
    isNeutral: {
        label: /is neutral/i,
        type: "boolean",
    },
    typeId: {
        label: /conductor type/i,
        type: "select",
    },
};

export default async function completeForm(
    user: UserEvent,
    form: HTMLElement,
    structure: FormStructure,
    data: Record<string, string | boolean | number>
) {
    for await (const [key, info] of Object.entries(structure)) {
        switch (info.type) {
            case "boolean": {
                const checkbox = within(form).getByLabelText(info.label);

                if (
                    data[key] !==
                    Boolean(
                        checkbox.attributes.getNamedItem("data-state")
                            ?.value === "checked"
                    )
                ) {
                    const input = within(form).getByLabelText(info.label);

                    await user.click(input);
                }
                break;
            }

            case "select": {
                const value = data[key] as string;

                if (!value) {
                    throw new Error(`No data provided for ${key}`);
                }
                const combobox = within(form).getByLabelText(info.label);

                if (combobox.textContent === value) {
                    return;
                }

                await user.click(combobox);
                const dialog = await screen.findByRole("dialog");
                const toSourceOptn = within(dialog).getByText(value);

                await user.click(toSourceOptn);
                break;
            }
            default: {
                const value = String(data[key]);
                const input = within(form).getByLabelText(info.label);

                await user.clear(input);
                await user.type(input, value);
            }
        }
    }
}
