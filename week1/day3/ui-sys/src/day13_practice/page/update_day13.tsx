import * as yup from "yup";
import { useForm, type SubmitHandler } from "react-hook-form";
import { inputClass, type CreateDay10Input } from "./create_day13";
import { type TaskDay13 } from "../const_day13";
import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "../../widgets/common/modal";
import apiClient from "../api/api-client";

const UpdateDay13 = ({
  task,
  onClose,
}: {
  task: TaskDay13;
  onClose: () => void;
}) => {
  // const navigate = useNavigate();
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
    defaultValues: {
      title: task.title,
      description: task.description,
      assignee_id: task.assignee_id,
      start_date: new Date(task.start_date),
      due_date: new Date(task.due_date),
      status: task.status,
      priority: task.priority,
    },
  });

  const onSubmit: SubmitHandler<CreateDay10Input> = async (
    data: CreateDay10Input
  ) => {
    try {
      await apiClient.patch(`/workspaces/tasks/${task.id}`, {
        title: data.title,
        description: data.description,
        assignee_id: data.assignee_id,
        start_date: data.start_date.toISOString(),
        due_date: data.due_date.toISOString(),
        status: data.status,
        priority: data.priority,
      });

      onClose();
    } catch (error) {
      console.error("Error updating task:", (error as Error).message);
    }
  };

  return (
    <Modal
      onClose={() => {
        onClose();
      }}
      onClickOutside={onClose}
      isShow={!!task}
      className="flex flex-col w-1/2 p-10 h-5/6 "
    >
      <div className="overflow-y-scroll">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h1 className="font-bold text-xl">Update Task</h1>
            <p>Task ID: {task.id}</p>
          </div>
        </div>
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
              <span className="text-red-500">{errors.title.message}</span>
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
              <span className="text-red-500">{errors.description.message}</span>
            )}
          </div>
          <div className="flex flex-col items-start gap-2">
            <label className="block text-sm font-medium text-gray-700">
              Assignee ID
            </label>
            <select {...register("assignee_id")} className={inputClass}>
              <option value="">Select Assignee</option>
              <option value="1">Assignee 1</option>
              <option value="2">Assignee 2</option>
              <option value="3">Assignee 3</option>
            </select>
            {errors.assignee_id && (
              <span className="text-red-500">{errors.assignee_id.message}</span>
            )}
          </div>
          <div className="flex flex-col items-start gap-2">
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select {...register("status")} className={inputClass}>
              <option value="">Select Status</option>
              <option value="to_do">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>
            {errors.status && (
              <span className="text-red-500">{errors.status.message}</span>
            )}
          </div>
          <div className="flex flex-col items-start gap-2">
            <label className="block text-sm font-medium text-gray-700">
              Priority
            </label>
            <select {...register("priority")} className={inputClass}>
              <option value="">Select Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            {errors.priority && (
              <span className="text-red-500">{errors.priority.message}</span>
            )}
          </div>
          <div className="flex flex-col items-start gap-2">
            <label className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              className={inputClass}
              type="date"
              placeholder="Start Date"
              {...register("start_date")}
            />
            {errors.start_date && (
              <span className="text-red-500">{errors.start_date.message}</span>
            )}
          </div>

          <div className="flex flex-col items-start gap-2">
            <label className="block text-sm font-medium text-gray-700">
              Due Date
            </label>
            <input
              className={inputClass}
              type="date"
              placeholder="Due Date"
              {...register("due_date")}
            />
            {errors.due_date && (
              <span className="text-red-500">{errors.due_date.message}</span>
            )}
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded"
          >
            Update Task
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default UpdateDay13;
