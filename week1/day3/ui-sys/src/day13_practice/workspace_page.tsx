import { NavLink, Outlet } from "react-router";
import { useAuthStore } from "./api/useAuthStore";

const WorkspacePage13 = () => {
  const { loggedInUser: user, logOut } = useAuthStore();
  return (
    <div className="grid grid-cols-10 h-full">
      <div className="col-span-2 bg-blue-500 p-4 flex flex-col h-full z-5 justify-between">
        <div className="flex flex-col gap-2 mt-4">
          <div className="bg-white p-4 rounded-md shadow-md mb-4">
            <h2 className="font-bold">User Info</h2>
            <p>Email: {user?.fullName}</p>
            <p>Role: {user?.roles.map((role) => role.name).join(", ")}</p>
          </div>
          <NavLink
            to="list"
            className={({ isActive }) =>
              [isActive ? "bg-white text-blue-500" : "text-white"] +
              " px-4 py-2 rounded-md shadow-md capitalize text-nowrap"
            }
          >
            List Tasks
          </NavLink>

          <NavLink
            to="create"
            className={({ isActive }) =>
              [isActive ? "bg-white text-blue-500" : "text-white"] +
              " px-4 py-2 rounded-md shadow-md capitalize text-nowrap"
            }
          >
            Create Task
          </NavLink>

          {user?.roles.filter((role) => {
            return ["Administrators", "Managers"].includes(role.name);
          }).length ? (
            <>
              <NavLink
                to="users"
                className={({ isActive }) =>
                  [isActive ? "bg-white text-blue-500" : "text-white"] +
                  " px-4 py-2 rounded-md shadow-md capitalize text-nowrap"
                }
              >
                Users
              </NavLink>
              <NavLink
                to="roles"
                className={({ isActive }) =>
                  [isActive ? "bg-white text-blue-500" : "text-white"] +
                  " px-4 py-2 rounded-md shadow-md capitalize text-nowrap"
                }
              >
                Roles
              </NavLink>
            </>
          ) : null}
        </div>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md mt-4 hover:bg-red-600 transition-colors"
          onClick={() => {
            logOut();
          }}
        >
          Logout
        </button>
      </div>
      <div className="col-span-8 bg-white p-4 flex flex-col gap-4 overflow-y-scroll">
        <div>
          <h2 className="font-bold">Workspace</h2>
          <p>This is the workspace area where you can manage your tasks.</p>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default WorkspacePage13;
