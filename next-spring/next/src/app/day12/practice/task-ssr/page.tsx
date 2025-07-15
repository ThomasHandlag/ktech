import { Tasks } from "@/app/types/task";
import Link from "next/link";

const baseUrl = "https://server.aptech.io/workspaces/tasks";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0dW5nbnRAc29mdGVjaC52biIsImVtYWlsIjoidHVuZ250QHNvZnRlY2gudm4iLCJzdWIiOjEsImFwcGxpY2F0aW9uIjoiT25saW5lIFNob3AgLSBBUEkiLCJyb2xlcyI6W3siaWQiOjEsIm5hbWUiOiJBZG1pbmlzdHJhdG9ycyJ9LHsiaWQiOjIsIm5hbWUiOiJNYW5hZ2VycyJ9XSwiaWF0IjoxNzUyNTYyMzI4LCJleHAiOjE3ODQxMTk5Mjh9.e0ltA7YyPEnRY2Mysna-jTLh1UGbvBu5ooz7baA-k9c";

const ProductsSSR = ({ products }: { products: Tasks[] }) => {
  return (
    <div className="flex flex-col items-center p-4">
      <h2>Tasks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products &&
          products.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg shadow-md">
              <Link
                href={`/day12/practice/task-isr/${product.id}`}
                className="text-blue-500 underline text-ellipsis"
              >
                {product.title}
              </Link>
              <p className="text-ellipsis">{product.description}</p>
            </div>
          ))}
      </div>
      
    </div>
  );
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

const Page = async () => {
  const products = await fetchProducts();
  return <ProductsSSR products={products} />;
};

export default Page;
