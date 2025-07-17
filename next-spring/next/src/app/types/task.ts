interface Task {
  id: number;
  title: string;
  description: string;
}

interface ETask {
  id: number;
  title: string;
  description: string;
  status: "to_do" | "in_progress" | "done";
  createdAt: string;
  updatedAt: string;
  due_date: string;
  start_date: string;
  assignee_id: number;
  userId: number;
}

export type { Task as Tasks, ETask };