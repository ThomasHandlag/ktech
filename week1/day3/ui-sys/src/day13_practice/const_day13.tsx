import React, { createContext, useContext } from "react";
import { AuthContext } from "./context_day13";
import type { NotificationInstance } from "antd/es/notification/interface";

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export interface TaskDay13 {
  id: number;
  created_time: string;
  updated_time: string;
  deleted_time: string | null;
  created_by: number;
  updated_by: number;
  deleted_by: number | null;
  title: string;
  description: string;
  start_date: string;
  due_date: string;
  completed_date: string | null;
  priority: "high" | "medium" | "low";
  status: "done" | "in_progress" | "to_do";
  assignee_id: number;
  parent_id: number | null;
  project_id: number | null;
}


interface GNotification {
  api: NotificationInstance;
}

export const MNoficationContext = createContext<GNotification | null>(null);

export const useGNotification = (): GNotification => {
  const context = useContext(MNoficationContext);
  if (!context) {
    throw new Error("useGNotification must be used within a MNoficationProvider");
  }
  return context;
};
