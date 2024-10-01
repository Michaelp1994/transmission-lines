import type { Project } from "@repo/db/schemas/projects";

export interface Store {
    project: Project | null;
}
