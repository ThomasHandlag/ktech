import { authOptions } from "@/lib/auth";
import { TaskBaseUrl } from "@/lib/faker";
import { getServerSession } from "next-auth";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  try {
    const body = await request.json();
    const response = await fetch(`${TaskBaseUrl}/workspaces/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log("Task created:", data);
    if (!response.ok) throw new Error("Failed to create task");

    return new Response(JSON.stringify(data), { status: 201 });
  } catch (error) {
    console.error("Error creating task:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}


