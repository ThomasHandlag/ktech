import { useEffect, useState } from "react";
import { type TaskDay13 } from "../const_day13";
import { useForm, type SubmitHandler } from "react-hook-form";
import UpdateDay13 from "./update_day13";
import { useAuthStore } from "../api/useAuthStore";
import apiClient from "../api/api-client";
import AccessButton from "./access_button";

interface Day13ListQuery {
  status?: string;
  assigneeId?: number;
  searchName?: string;
}

interface FilterDay13Input {
  status: string;
  assigneeId: number;
  searchName: string;
}

const ListDay13 = () => {
  const { access_token, loggedInUser: user } = useAuthStore();

  const [listTasks, setListTasks] = useState<TaskDay13[]>([]);

  const [query, setQuery] = useState<Day13ListQuery>({});

  const [selectedTask, setSelectedTask] = useState<TaskDay13 | null>(null);

  const cellHeaderClass =
    "px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider";
  const cellClass = "px-6 py-4 whitespace-nowrap text-sm text-gray-500";

  useEffect(() => {
    const fetchTasks = async () => {
      if (access_token) {
        try {
          const dat = (await apiClient.get("/workspaces/tasks")) as TaskDay13[];
          // const response = await axios.get(`${BASE_URL}/workspaces/tasks`, {
          //   headers: {
          //     Authorization: `Bearer ${access_token}`,
          //   },
          // });
          setListTasks(dat);
        } catch (error) {
          console.error("Error fetching tasks:", (error as Error).message);
        }
      }
    };

    fetchTasks();
  });

  const filterByStatus = (status: string) => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      status,
    }));
  };

  const filterByAssignee = (assigneeId: number) => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      assigneeId,
    }));
  };

  const filterBySearchName = (name: string) => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      searchName: name,
    }));
  };

  const handleDeleteTask = async (taskId: number) => {
    if (access_token) {
      try {
        await apiClient.delete(`/workspaces/tasks/${taskId}`);
      } catch (error) {
        console.error("Error deleting task:", (error as Error).message);
      }
    }
  };

  const { register, handleSubmit } = useForm<FilterDay13Input>();

  const onSubmit: SubmitHandler<FilterDay13Input> = (data) => {
    filterByStatus(data.status);
    filterByAssignee(data.assigneeId);
    filterBySearchName(data.searchName);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6 flex flex-col items-center justify-start">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-row gap-4 items-center"
        >
          <input
            type="text"
            placeholder="Search by name"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("searchName")}
          />
          <select {...register("assigneeId")}>
            <option value="">All Assignees</option>
            <option value={1}>Assignee 1</option>
            <option value={2}>Assignee 2</option>
            <option value={3}>Assignee 3</option>
          </select>
          <select
            {...register("status")}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Statuses</option>
            <option value="to_do">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition-colors"
          >
            Filter
          </button>
          <button
            type="button"
            onClick={() => setQuery({})}
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition-colors"
          >
            Clear filter
          </button>
        </form>
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
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
            {listTasks
              .filter(
                (task) =>
                  (!query.status || task.status === query.status) &&
                  (!query.assigneeId || task.assignee_id == query.assigneeId) &&
                  (!query.searchName ||
                    task.title
                      .toLowerCase()
                      .includes(query.searchName.toLowerCase()))
              )
              .map((task) => (
                <tr
                  key={task.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {task.title}
                  </td>
                  <td className={cellClass}>{task.description}</td>
                  <td className={cellClass}>{task.assignee_id}</td>
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
                    <AccessButton
                      roles={user?.roles.map((role) => role.name)}
                      className="text-blue-600 hover:text-blue-900 bg-blue-100 px-3 py-1 rounded-md transition-colors"
                      onClick={() => setSelectedTask(task)}
                    >
                      Edit
                    </AccessButton>
                    <AccessButton
                      roles={user?.roles.map((role) => role.name)}
                      className="text-red-600 hover:text-red-900 bg-red-100 px-3 py-1 rounded-md transition-colors"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      Delete
                    </AccessButton>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {selectedTask && (
        <UpdateDay13
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
};

export default ListDay13;
