import { z } from "zod";
import { projectId } from "../Ids.schema";

export const createProjectSchema = z.object({
    name: z.string().min(3).max(100),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;

// update

export const updateProjectSchema = z.object({
    name: z.string().min(3).max(100),
});

export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;

// getProject

export const getProjectSchema = z.object({});

export type GetProjectInput = z.infer<typeof getProjectSchema>;

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

export const openProjectSchema = z.object({
    name: z.string(),
    version: z.string(),
});

// export

export const exportProjectSchema = z.object({});

export type ExportProjectInput = z.infer<typeof exportProjectSchema>;
