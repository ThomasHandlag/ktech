// import type { TaskDay10 } from "../const_day10";
import { apiClient } from "./api-client";

interface ITaskDay10 {
  title: string;
  assignee_id: number;
  status: string;
  start_date: Date;
  due_date: Date;
}

export const getTasks = async (accessToken: string) => {
  return await apiClient.get(`/workspaces/tasks`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const createTask = async (task: ITaskDay10, accessToken: string) => {
  return await apiClient.post(`/workspaces/tasks`, task, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const deleteTask = async (
  taskId: number,
  accessToken: string,
  callBack: (error?: string) => void
) => {
  await apiClient
    .delete(`/workspaces/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      if (response.status !== 204) {
        return callBack("Failed to delete task");
      }
      callBack();
    });
};

// fetch task by id
export const getTaskById = async (taskId: number, accessToken: string) => {
  return await apiClient.get(`/workspaces/tasks/${taskId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

// update task by id
export const updateTask = async (
  taskId: number,
  task: ITaskDay10,
  accessToken: string
) => {
  return await apiClient.patch(`/workspaces/tasks/${taskId}`, task, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
