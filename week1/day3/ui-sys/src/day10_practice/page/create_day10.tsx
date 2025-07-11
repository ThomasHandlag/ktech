import { useForm, type SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createTask } from "../api";
import { useAuth } from "../const_day10";
import { useNavigate } from "react-router";

export interface CreateDay10Input {
  title: string;
  description: string;
  start_date: string;
  due_date: string;
  priority: string;
  status: string;
  assignee_id: number;
}

export const inputClass =
  "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 px-4 py-2";

const CreateTaskDay10 = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const schema = yup.object().shape({
    title: yup
      .string()
      .max(100, "Maximum 100 characters")
      .required("Title is required"),
    description: yup
      .string()
      .max(500, "Maximum 500 characters")
      .required("Description is required"),
    priority: yup
      .string()
      .oneOf(["high", "medium", "low"])
      .required("Priority is required"),
    status: yup
      .string()
      .oneOf(["done", "in_progress", "to_do"])
      .required("Status is required"),
    start_date: yup.date().required("Start date is required"),
    due_date: yup
      .date()
      .required("Due date is required")
      .min(yup.ref("start_date"), "Due date must be after start date"),
    assignee_id: yup.number().required("Assignee ID is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateDay10Input>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<CreateDay10Input> = async (
    data: CreateDay10Input
  ) => {
    const response = await createTask(data, user!.accessToken);
    try {
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create task");
      }
      navigate(-1);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create Task</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-start gap-2">
          <label className="block text-sm font-medium text-gray-700">
            Task Name
          </label>
          <input
            {...register("title")}
            placeholder="Enter task name"
            type="text"
            className={inputClass}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>
        <div className="flex flex-col items-start gap-2">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            {...register("description")}
            placeholder="Enter task description"
            className={inputClass}
          ></textarea>
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>
        <div className="flex flex-col items-start gap-2">
          <label className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            {...register("start_date")}
            placeholder="Select start date"
            type="date"
            className={inputClass}
          />
          {errors.start_date && (
            <p className="mt-1 text-sm text-red-600">
              {errors.start_date.message}
            </p>
          )}
        </div>
        <div className="flex flex-col items-start gap-2">
          <label className="block text-sm font-medium text-gray-700">
            Due Date
          </label>
          <input
            type="date"
            {...register("due_date")}
            placeholder="Select due date"
            className={inputClass}
          />
          {errors.due_date && (
            <p className="mt-1 text-sm text-red-600">
              {errors.due_date.message}
            </p>
          )}
        </div>
        <div className="flex flex-col items-start gap-2">
          <label className="block text-sm font-medium text-gray-700">
            Assignee ID
          </label>
          <select className={inputClass} {...register("assignee_id")}>
            <option value="1">Assignee 1</option>
            <option value="2">Assignee 2</option>
            <option value="3">Assignee 3</option>
          </select>
          {errors.assignee_id && (
            <p className="mt-1 text-sm text-red-600">
              {errors.assignee_id.message}
            </p>
          )}
        </div>
        <div className="flex flex-col items-start gap-2">
          <label className="block text-sm font-medium text-gray-700">
            Priority
          </label>
          <select className={inputClass} {...register("priority")}>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          {errors.priority && (
            <p className="mt-1 text-sm text-red-600">
              {errors.priority.message}
            </p>
          )}
        </div>
        <div className="flex flex-col items-start gap-2">
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select className={inputClass} {...register("status")}>
            <option value="to_do">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          {errors.status && (
            <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 shrink"
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateTaskDay10;
