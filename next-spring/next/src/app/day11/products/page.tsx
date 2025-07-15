import { Product } from "@/app/types/product";

const baseUrl = "https://api.escuelajs.co/api/v1/products";

const fetchProducts = async () => {
  const res = await fetch(baseUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await res.json();
  return data;
};

const Page = async () => {
  const products: Product[] = await fetchProducts();
  return (
    <div>
      <h2>Product Page</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
