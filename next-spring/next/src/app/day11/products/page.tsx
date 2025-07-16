import { Product } from "@/app/types/product";
import Image from "next/image";

const baseUrl = "https://api.escuelajs.co/api/v1/products?offset=0&limit=10";

const fetchProducts = async () => {
  const res = await fetch(baseUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "force-cache"
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
      <div className="grid lg:grid-cols-5 gap-4 sm:grid-cols-1">
        {products.map(
          (product) =>
            product && (
              <div key={product.id} className="flex flex-col items-center p-4 border rounded-lg">
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  width={200}
                  height={200}
                  className="object-fill mb-2"
                  loading="lazy"
                  quality={10}
                  placeholder="blur"
                  blurDataURL="https://via.placeholder.com/200"
                />
                <h3 className="text-ellipsis max-h-20">{product.title}</h3>
                <p className="text-red-500">Price: ${product.price}</p>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Page;
