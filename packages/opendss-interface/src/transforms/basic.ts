import { Bus } from "@/schemas";

export const arrayTransform = (input: Array<string | number>) =>
    `[${input.join(" ")}]`;
export const booleanTransform = (input: boolean) => (input ? "true" : "false");
export const busTransform = (input: Bus) =>
    `${input.name}.${input.phases.join(".")}`;
