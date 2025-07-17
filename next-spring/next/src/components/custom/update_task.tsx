"use client";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ETask } from "@/app/types/task";
import { CreateTaskInput } from "./create_task";

const UpdateTask = ({ task }: { task: ETask }) => {
  const [loading, setLoading] = useState(false);

  const InputSchema = z.object({
    title: z
      .string()
      .min(1, "Title is required")
      .max(100, "Title must be less than 100 characters"),
    description: z
      .string()
      .min(1, "Description is required")
      .max(500, "Description must be less than 500 characters"),
    assignee_id: z.string().min(1, "Assignee is required"),
    status: z.enum(["to_do", "in_progress", "done"], "Invalid status"),
    start_date: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), "Invalid start date"),
    due_date: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), "Invalid due date")
      .refine((val) => {
        const startDate = new Date(val);
        const currentDate = new Date();
        if (startDate < currentDate) {
          return false;
        }
        return true;
      }),
  });

  const onSubmit = async (data: z.infer<typeof InputSchema>) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          assignee_id: Number(data.assignee_id),
          status: data.status,
          start_date: data.start_date,
          due_date: data.due_date,
        }),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      toast.success("Task updated successfully");
    } catch (error) {
      console.error("Failed to update task:", error);
      toast.error("Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  const form = useForm<CreateTaskInput>({
    mode: "onBlur",
    resolver: zodResolver(InputSchema),
    defaultValues: {
      title: task.title ?? "",
      description: task.description ?? "",
      assignee_id: String(task.assignee_id),
      status: task.status,
      start_date: new Date(task.start_date).toISOString().split("T")[0],
      due_date: new Date(task.due_date).toISOString().split("T")[0],
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="flex items-center gap-2">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Task</DialogTitle>
          <DialogDescription>
            Fill in the details for your task.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="title">Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Task Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Task Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="assignee_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="assignee_id">Assignee</FormLabel>
                  <FormControl>
                    <Select defaultValue="1" {...field}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Assignee" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Assignee 1</SelectItem>
                        <SelectItem value="2">Assignee 2</SelectItem>
                        <SelectItem value="3">Assignee 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="status">Status</FormLabel>
                  <FormControl>
                    <Select defaultValue="to_do" {...field}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="to_do">To Do</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="done">Done</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="start_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="start_date">Start Date</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" id="start_date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="due_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="due_date">Due Date</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" id="due_date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="flex justify-between">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">
                {loading && <Loader2Icon className="animate-spin" />} Update
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateTask;
