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
      <Image
        src="https://cdnv2.tgdd.vn/mwg-static/tgdd/Banner/b6/dd/b6dd779ce5e8a918cc4f557fce984b16.png"
        alt="Banner"
        width={1200}
        height={300}
        loading="lazy"
        quality={10}
        placeholder="blur"
        blurDataURL="https://via.placeholder.com/1200x300"
        className="object-cover mb-4"
      />
      <div className="grid lg:grid-cols-5 gap-4 sm:grid-cols-1">
        {products.map((product) => (
          <Link
            href={`/day13/detail/${product.id}`}
            key={product.id}
            className="flex flex-col items-center p-4 border rounded-lg"
          >
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
          </Link>
        ))}
      </div>
    </div>
  );
};
