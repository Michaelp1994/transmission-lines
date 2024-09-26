import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/project/")({
    component: ProjectPage,
});

export default function ProjectPage() {
    return <div>hello</div>;
}
