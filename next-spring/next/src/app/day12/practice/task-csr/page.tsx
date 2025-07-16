"use client";

import { Tasks } from "@/app/types/task";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

const baseUrl = "https://server.aptech.io/workspaces/tasks";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0dW5nbnRAc29mdGVjaC52biIsImVtYWlsIjoidHVuZ250QHNvZnRlY2gudm4iLCJzdWIiOjEsImFwcGxpY2F0aW9uIjoiT25saW5lIFNob3AgLSBBUEkiLCJyb2xlcyI6W3siaWQiOjEsIm5hbWUiOiJBZG1pbmlzdHJhdG9ycyJ9LHsiaWQiOjIsIm5hbWUiOiJNYW5hZ2VycyJ9XSwiaWF0IjoxNzUyNTYyMzI4LCJleHAiOjE3ODQxMTk5Mjh9.e0ltA7YyPEnRY2Mysna-jTLh1UGbvBu5ooz7baA-k9c";

const Page = () => {
  const createTask = async () => {
    for (let i = 0; i < 50; i++) {
      const res = await fetch(baseUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: `Task ${i + 1}`,
          description: `Description for task ${i + 1}`,
          assignee_id: 1,
          status: "to_do",
          start_date: "2025-07-10 08:30:00",
          due_date: "2025-07-12 17:00:00",
        }),
      });
      if (!res.ok) {
        console.error("Error creating task:", await res.json());
      }
    }
  };

  const fetchProducts = async () => {
    const res = await fetch(baseUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await res.json();
    return data;
  };

  const [products, setProducts] = React.useState<Tasks[]>([]);

  React.useEffect(() => {
    fetchProducts().then(setProducts).catch(console.error);
  }, []);

  return (
    <div className="flex flex-col items-center p-4">
      <h2>Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products &&
          products.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg shadow-md">
              <Link href={`/day12/practice/task-csr/${product.id}`}>
                {product.title}
              </Link>
              <p>{product.description}</p>
            </div>
          ))}
      </div>
      <button
        onClick={() => {
          createTask().then(() => {
            toast.success("Tasks created successfully!");
          });
        }}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Load More
      </button>
    </div>
  );
};

export default Page;
