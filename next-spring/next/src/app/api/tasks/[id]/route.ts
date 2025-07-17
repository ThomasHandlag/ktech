import { authOptions } from "@/lib/auth";
import { TaskBaseUrl } from "@/lib/faker";
import { getServerSession } from "next-auth";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  const id = (await params).id;
  try {
    const response = await fetch(
      `${TaskBaseUrl}/workspaces/tasks/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      }
    );

    if (!response.ok) throw new Error("Failed to delete task");
    return new Response("Task deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting task:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  const id = (await params).id;
  try {
    const response = await fetch(
      `${TaskBaseUrl}/workspaces/tasks/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
        body: JSON.stringify(request.body),
      }
    );

    const data = await response.json();
    console.log("Task updated:", data);

    if (!response.ok) throw new Error("Failed to update task");
    return new Response("Task updated successfully", { status: 200 });
  } catch (error) {
    console.error("Error updating task:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}