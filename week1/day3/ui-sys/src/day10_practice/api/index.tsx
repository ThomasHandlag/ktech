import type { UserDay10 } from "../context_day10";

const baseUrl = "https://server.aptech.io";

interface TaskDay10 {
  title: string;
  assignee_id: number;
  status: string;
  start_date: Date;
  due_date: Date;
}

const tokenName: string = "userToken";

export const getLocalUser = (): UserDay10 | null => {
  const user = localStorage.getItem(tokenName);
  return user ? JSON.parse(user) : null;
};

export const setLocalUser = (user: UserDay10) => {
  localStorage.setItem(tokenName, JSON.stringify(user));
};

export const clearLocalUser = () => {
  localStorage.removeItem(tokenName);
};

export const login = async (email: string, password: string) => {
  return await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: email, password }),
  });
};

export const getTasks = async (accessToken: string) => {
  return await fetch(`${baseUrl}/workspaces/tasks`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const createTask = async (task: TaskDay10, accessToken: string) => {
  return await fetch(`${baseUrl}/workspaces/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(task),
  });
};

export const deleteTask = async (taskId: number, accessToken: string, callBack: (error?: string) => void) => {
  const response = await fetch(`${baseUrl}/workspaces/tasks/${taskId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (response.ok) {
    callBack();
  } else {
    const errorData = await response.json();
    callBack(errorData.message || "Failed to delete task");
  }
}

// fetch task by id
export const getTaskById = async (taskId: number, accessToken: string) => {
  return await fetch(`${baseUrl}/workspaces/tasks/${taskId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

// update task by id
export const updateTask = async (taskId: number, task: TaskDay10, accessToken: string) => {
  return await fetch(`${baseUrl}/workspaces/tasks/${taskId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(task),
  });
};
