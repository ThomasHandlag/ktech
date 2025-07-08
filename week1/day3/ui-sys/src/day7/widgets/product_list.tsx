import { useParams } from "react-router";
import type { ItemPropsDay7 } from "../widgets/item";
import { useEffect, useState } from "react";
import { baseUrl } from "../day7practice";
import ItemDay7 from "../widgets/item";

const ProductList = () => {
  const params = useParams();
  const cat_id = Number(params.cat_id);
  const [products, setProducts] = useState<ItemPropsDay7[]>([]);
  const [offset, setOffset] = useState<number>(1);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        `${baseUrl}/${
          cat_id == 0 ? "products" : `categories/${cat_id}/products`
        }`,
        { method: "GET" }
      );
      try {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data: ItemPropsDay7[] = await response.json();
        setProducts(data);
        console.log("Products fetched:", data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [cat_id]);
  return (
    <div className="flex flex-col gap-4">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {products.slice((offset - 1) * 4, offset * 4).map((product) => (
          <ItemDay7
            slug={product.slug}
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
            images={product.images}
            categoryId={product.categoryId}
          />
        ))}
      </div>
      <div className="flex justify-center items-center gap-2 p-4">
        {Array.from({ length: Math.ceil(products.length / 4) }, (_, index) => {
          const page = index + 1;
          return (
            <button
              key={index}
              className={`px-4 py-2 rounded-md ${
                page === offset ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => {
                setOffset(page);
              }}
            >
              {page}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
