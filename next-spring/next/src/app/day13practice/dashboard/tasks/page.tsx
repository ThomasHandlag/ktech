import { ETask } from "@/app/types/task";
import ConfirmDelete from "@/components/custom/confirm_delete";
import CreateTask from "@/components/custom/create_task";
import UpdateTask from "@/components/custom/update_task";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { toast } from "sonner";

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return (
      <div>
        <h1>You are not logged in</h1>
      </div>
    );
  }

  const response = await fetch("https://server.aptech.io/workspaces/tasks", {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  });
  if (!response.ok) {
    toast.error("Failed to fetch tasks");
  }
  const tasks: ETask[] = await response.json();
  return <TaskList taskList={tasks} />;
};

const cellHeaderClass =
  "px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500";
const cellClass = "px-6 py-4 whitespace-nowrap text-sm text-gray-500";

const TaskList = ({ taskList }: { taskList: ETask[] }) => {
  return (
    <div className="max-h-full overflow-y-scroll flex flex-col gap-2">
      <div className="flex justify-between items-center top-0 sticky z-10 bg-white shadow">
        <h2 className="text-lg font-medium">Task List</h2>
        <CreateTask />
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              className={
                "px-6 py-4 text-left text-xs font-medium  uppercase tracking-wider  text-black"
              }
            >
              Title
            </th>
            <th className={cellHeaderClass}>Description</th>
            <th className={cellHeaderClass}>Assignee ID</th>
            <th className={cellHeaderClass}>Status</th>
            <th className={cellHeaderClass}>Start Date</th>
            <th className={cellHeaderClass}>Due Date</th>
            <th className={cellHeaderClass}>Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {taskList.map((task) => (
            <tr key={task.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {task.title}
              </td>
              <td className={cellClass}>{task.description}</td>
              <td className={cellClass}>{task.userId}</td>
              <td className={cellClass}>
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${
                      task.status === "done"
                        ? "bg-green-100 text-green-800"
                        : task.status === "in_progress"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                >
                  {task.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(task.start_date).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(task.due_date).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                <UpdateTask task={task} />
                <ConfirmDelete id={task.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
