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
import { Loader2Icon, Plus } from "lucide-react";
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

export interface CreateTaskInput {
  title: string;
  description: string;
  assignee_id: string;
  status: "to_do" | "in_progress" | "done";
  start_date: string;
  due_date: string;
}
const CreateTask = () => {
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
      const response = await fetch("/api/tasks", {
        method: "POST",
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
      toast.success("Task created successfully");
    } catch (error) {
      console.error("Failed to create task:", error);
      toast.error("Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  const form = useForm<CreateTaskInput>({
    mode: "onBlur",
    resolver: zodResolver(InputSchema),
    defaultValues: {
      title: "",
      description: "",
      assignee_id: "1",
      status: "to_do",
      start_date: new Date().toISOString().slice(0, 16),
      due_date: new Date(new Date().setDate(new Date().getDate() + 7))
        .toISOString()
        .slice(0, 16),
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Plus /> Create task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
          <DialogDescription>
            Fill in the details for your new task.
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
              <DialogClose asChild>
                <Button type="submit">
                  {loading && <Loader2Icon className="animate-spin" />} Create
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTask;
