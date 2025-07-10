import { NavLink, Outlet } from "react-router";
import { useAuth } from "./const_day10";

const WorkspacePage = () => {
  const { user } = useAuth();
  return (
    <div className="grid grid-cols-10 h-full">
      <div className="col-span-2 bg-blue-500 p-4 flex flex-col h-full z-5">
        <div>
          <h2 className="font-bold">User Info</h2>
          <p>Email: {user?.email}</p>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <NavLink
            to="list"
            className={`${({ isActive }: { isActive: boolean }) =>
              isActive
                ? "text-blue-500 bg-white"
                : "text-white"} p-2 rounded shadow`}
          >
            List Tasks
          </NavLink>
          <NavLink
            to="create"
            className={({ isActive }) =>
                [isActive ? "bg-white text-blue-500" : ""] +
                " px-4 py-2 rounded-md shadow-md capitalize text-nowrap"}
          >
            Create Task
          </NavLink>
        </div>
      </div>
      <div className="col-span-8 bg-white p-4 flex flex-col gap-4 justify-between overflow-y-scroll">
        <div>
          <h2 className="font-bold">Workspace</h2>
          <p>
            This is the workspace area where you can manage your projects and
            tasks.
          </p>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default WorkspacePage;
