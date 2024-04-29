import { z } from "zod";

import { projectId } from "../Ids.schema";

export const createProjectSchema = z.object({
    name: z.string().min(3).max(100),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;

// update

export const updateProjectSchema = createProjectSchema.extend({
    id: projectId,
});

export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;

// getAllProjects

export const getAllProjectsSchema = z.object({}).optional();

export type GetAllProjectsInput = z.infer<typeof getAllProjectsSchema>;

// getById

export const getProjectByIdSchema = z.object({ id: projectId });

export type GetProjectByIdInput = z.infer<typeof getProjectByIdSchema>;

// delete

export const deleteProjectSchema = z.object({ id: projectId });

export type DeleteProjectInput = z.infer<typeof deleteProjectSchema>;

// solve

export const solveProjectSchema = z.object({ id: projectId });

export type SolveProjectInput = z.infer<typeof solveProjectSchema>;

// import

export const importProjectSchema = z.object({
    id: projectId,
    name: z.string(),
    // sources: updateSourceSchema.array().optional(),
    // transmissionLines: updateTransmissionLineSchema.array().optional(),
});

export type ImportProjectInput = z.infer<typeof importProjectSchema>;

// export

export const exportProjectSchema = z.object({ id: projectId });

export type ExportProjectInput = z.infer<typeof exportProjectSchema>;
