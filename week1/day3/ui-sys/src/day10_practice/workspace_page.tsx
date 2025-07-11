import { NavLink, Outlet } from "react-router";
import { useAuth } from "./const_day10";

const WorkspacePage = () => {
  const { user, setUser } = useAuth();
  return (
    <div className="grid grid-cols-10 h-full">
      <div className="col-span-2 bg-blue-500 p-4 flex flex-col h-full z-5 justify-between">
        <div className="flex flex-col gap-2 mt-4">
          <div>
            <h2 className="font-bold">User Info</h2>
            <p>Email: {user?.email}</p>
          </div>
          <NavLink
            to="list"
            className={({ isActive }) =>
              [isActive ? "bg-white text-blue-500" : ""] +
              " px-4 py-2 rounded-md shadow-md capitalize text-nowrap"
            }
          >
            List Tasks
          </NavLink>
          <NavLink
            to="create"
            className={({ isActive }) =>
              [isActive ? "bg-white text-blue-500" : ""] +
              " px-4 py-2 rounded-md shadow-md capitalize text-nowrap"
            }
          >
            Create Task
          </NavLink>
        </div>
        <button
        className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md mt-4 hover:bg-red-600 transition-colors"
          onClick={() => {
            localStorage.removeItem("token");
            // window.location.reload();
            setUser(null);
          }}
        >
          Logout
        </button>
      </div>
      <div className="col-span-8 bg-white p-4 flex flex-col gap-4 overflow-y-scroll">
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
