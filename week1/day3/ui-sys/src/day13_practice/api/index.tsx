import type { TaskDay13 } from "../const_day13";
import type { LoggedInUser, Role } from "../models/models";
import apiClient from "./api-client";

export const getRoles = async (): Promise<Role[] | string> => {
  return await apiClient.get("/security/roles");
};

export const deleteRole = async (
  roleId: number
): Promise<string | undefined> => {
  return await apiClient.delete(`/security/roles/${roleId}`);
};

export const updateRole = async (
  roleId: string,
  roleData: Partial<Role>
): Promise<string | undefined> => {
  return apiClient.patch(`/security/roles/${roleId}`, roleData);
};

export const createRole = async (
  roleData: Partial<Role>
): Promise<string | undefined> => {
  return apiClient.post("/security/roles", roleData);
};

// <------------------ user api ---------------------->
export const getUsers = async (): Promise<LoggedInUser | string> => {
  return await apiClient.get("/security/users");
};

export const deleteUser = async (
  userId: string
): Promise<string | undefined> => {
  return apiClient.delete(`/security/users/${userId}`);
};

export const updateUser = async (
  userId: string,
  userData: Partial<LoggedInUser>
): Promise<string | undefined> => {
  return apiClient.patch(`/security/users/${userId}`, userData);
};

export const createUser = async (
  userData: Partial<LoggedInUser>
): Promise<string | undefined> => {
  return apiClient.post("/security/users", userData);
};

export const getUsersByRole = async (
  roleId: string
): Promise<LoggedInUser[] | string> => {
  return await apiClient.get(`/security/users/role/${roleId}`);
};

// <------------------ workspace/tasks api ---------------------->

export const getTasks = async (): Promise<TaskDay13 | undefined> => {
  return await apiClient.get("/workspaces/tasks");
};

export const deleteTask = async (
  taskId: string
): Promise<string | undefined> => {
  return apiClient.delete(`/workspaces/tasks/${taskId}`);
};

export const createTask = async (
  taskData: Partial<TaskDay13>
): Promise<string | undefined> => {
  return apiClient.post("/workspaces/tasks", taskData);
};

export const updateTask = async (
  taskId: string,
  taskData: Partial<TaskDay13>
): Promise<string | undefined> => {
  return apiClient.patch(`/workspaces/tasks/${taskId}`, taskData);
};

export const getTaskById = async (
  taskId: string
): Promise<TaskDay13 | undefined> => {
  return await apiClient.get(`/workspaces/tasks/${taskId}`);
};

export const getTasksByAssignee = async (
  assigneeId: number
): Promise<TaskDay13[] | string> => {
  return await apiClient.get(`/workspaces/tasks/assignee/${assigneeId}`);
};
