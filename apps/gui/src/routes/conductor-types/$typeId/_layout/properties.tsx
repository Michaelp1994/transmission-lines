import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
    "/conductor-types/$typeId/_layout/properties"
)({
    component: () => (
        <div>Hello /conductor-types/$typeId/_layout/properties!</div>
    ),
});
