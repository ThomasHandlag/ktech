const baseUrl = "https://server.aptech.io/workspaces/tasks";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0dW5nbnRAc29mdGVjaC52biIsImVtYWlsIjoidHVuZ250QHNvZnRlY2gudm4iLCJzdWIiOjEsImFwcGxpY2F0aW9uIjoiT25saW5lIFNob3AgLSBBUEkiLCJyb2xlcyI6W3siaWQiOjEsIm5hbWUiOiJBZG1pbmlzdHJhdG9ycyJ9LHsiaWQiOjIsIm5hbWUiOiJNYW5hZ2VycyJ9XSwiaWF0IjoxNzUyNTYyMzI4LCJleHAiOjE3ODQxMTk5Mjh9.e0ltA7YyPEnRY2Mysna-jTLh1UGbvBu5ooz7baA-k9c";

const Page = async ({ params }: { params: Promise<{ id: number }> }) => {
  const resolvedParams = await params;
  const res = await fetch(`${baseUrl}/${resolvedParams.id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
      revalidate: 60,
      tags: [`task-${resolvedParams.id}`],
    },
  });
  if (!res.ok) {
    const resError = await res.json();
    console.error("Error fetching product:", resError);
    throw new Error("Failed to fetch product");
  }
  const data = await res.json();

  return (
    <div className="flex flex-col items-center p-4">
      <h2>{data.title}</h2>
      <p>{data.description}</p>
    </div>
  );
};

export default Page;
