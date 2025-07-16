import Image from "next/image";
import { Product } from "@/app/types/product";
import Link from "next/link";

const Page = async () => {
  const products: Product[] = await fetchProducts();
  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center justify-center gap-4 p-2 bg-white">
        <ProductList products={products} />
      </div>
    </div>
  );
};

export default Page;

const baseUrl = "https://api.escuelajs.co/api/v1/products?offset=0&limit=30";

const fetchProducts = async () => {
  const res = await fetch(baseUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "force-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await res.json();
  return data;
};

const ProductList = ({ products }: { products: Product[] }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative aspect-square h-[300px] w-full">
        <Image
          src="https://cdnv2.tgdd.vn/mwg-static/tgdd/Banner/b6/dd/b6dd779ce5e8a918cc4f557fce984b16.png"
          alt="Banner"
          fill
          priority
          placeholder="blur"
          blurDataURL="https://via.placeholder.com/1200x300"
          className="object-fill mb-4"
        />
      </div>
      <div className="grid lg:grid-cols-5 gap-4 sm:grid-cols-1">
        {products.map((product, index) => (
          <Link
            href={`/day13/detail/${product.id}`}
            key={product.id}
            className="flex flex-col items-center p-4 border rounded-lg aspect-square"
          >
            <div className="relative w-full h-[200px]">
              <Image
                src={product.images[0]}
                alt={product.title}
                fill
                priority={index < 5}
                className="object-fill mb-2"
                loading={index < 5 ? "eager" : "lazy"}
                placeholder="blur"
                blurDataURL="https://via.placeholder.com/200"
              />
            </div>
            <h3 className="text-ellipsis max-h-20">{product.title}</h3>
            <p className="text-red-500">Price: ${product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
