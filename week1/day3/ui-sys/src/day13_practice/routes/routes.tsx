import { Navigate, type RouteObject } from "react-router";
import Roles from "../page/roles";
import WorkspacePage13 from "../workspace_page";
import ListUserDay13 from "../page/list_userday13";
import ListDay13 from "../page/list_day13";
import CreateTaskDay13 from "../page/create_day13";

export const AdminRoutes: RouteObject = {
  path: "workspace",
  element: <WorkspacePage13 />,
  children: [
    {
      index: true,
      element: <Navigate to="list" />,
    },
    {
      path: "list",
      element: <ListDay13 />,
    },
    {
      path: "create",
      element: <CreateTaskDay13 />,
    },
    {
      path: "roles",
      element: <Roles />,
    },
    {
      path: "users",
      element: <ListUserDay13 />,
    },
  ],
};

export const MembersRoutes: RouteObject = {
  path: "workspace",
  element: <WorkspacePage13 />,
  children: [
    {
      index: true,
      element: <Navigate to="list" />,
    },
    {
      path: "list",
      element: <ListDay13 />,
    },
  ],
};

export const ManagerRoutes: RouteObject = {
  path: "workspace",
  element: <WorkspacePage13 />,
  children: [
    {
      index: true,
      element: <Navigate to="list" />,
    },
    {
      path: "list",
      element: <ListDay13 />,
    },
    {
      path: "create",
      element: <CreateTaskDay13 />,
    },
  ],
};



export const taskRouteBuilder = (role: string[]): RouteObject => {
  if (role.includes("Administrators")) {
    return AdminRoutes;
  } else if (role.includes("Managers")) {
    // return managerRoutes;
    return AdminRoutes;
  } else if (role.includes("Members")) {
    return MembersRoutes;
  } else {
    return {
      index: true,
      element: <Navigate to="/day13practice/login" />,
    };
  }
};
