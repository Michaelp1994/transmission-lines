import { Bus } from "@/schemas";

export const arrayTransform = (input?: Array<string | number>) =>
    input !== undefined ? `[${input.join(" ")}]` : undefined;
export const booleanTransform = (input?: boolean) => {
    if (input === undefined) return undefined;
    return input ? "true" : "false";
};
export const busTransform = (input?: Bus) =>
    input !== undefined ? `${input.name}.${input.phases.join(".")}` : undefined;

export const numberTransform = (input?: number) =>
    input !== undefined ? String(input) : undefined;