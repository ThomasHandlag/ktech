import { Product } from "@/app/types/product";
import Image from "next/image";

const fetchProductData = async (id: number) => {
  const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "force-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch product data");
  }
  const data = await res.json();
  return data;
};

const DetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const productId = parseInt((await params).id, 10);
  const product = await fetchProductData(productId);
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Detail Page</h1>
      <p className="text-gray-600">This is the detail page content.</p>
      <div className="mt-4">
        <ProductDetail product={product} />
      </div>
    </div>
  );
};

const ProductDetail = ({ product }: { product: Product }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 aspect-square">
      <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
      <Image
        src={product.images[0]}
        alt={product.title}
        width={400}
        height={400}
        className="object-cover mb-4"
        loading="lazy"
        quality={80}
        placeholder="blur"
        blurDataURL="https://via.placeholder.com/400"
      />
      <p className="text-gray-600 mb-2">{product.description}</p>
      <p className="text-red-500 text-lg">Price: ${product.price}</p>
    </div>
  );
};

export default DetailPage;
