import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";

const baseUrl = "https://api.escuelajs.co/api/v1/products";
const PRODUCTS_PER_PAGE = 12;

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}

interface ProductsPageProps {
  products: Product[];
  currentPage: number;
  hasMore: boolean;
}

const fetchProducts = async (offset = 0, limit = PRODUCTS_PER_PAGE): Promise<Product[]> => {
  const response = await fetch(`${baseUrl}?offset=${offset}&limit=${limit}`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
};

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={product.images[0] || "/images/ufo.jpg"}
          alt={product.title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {product.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-green-600">
            ${product.price}
          </span>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductsWithPagination = ({ products, currentPage, hasMore }: { products: Product[]; currentPage: number; hasMore: boolean }) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <PaginationControls currentPage={currentPage} hasMore={hasMore} />
    </>
  );
};

const PaginationControls = ({ currentPage, hasMore }: { currentPage: number; hasMore: boolean }) => {
  return (
    <div className="flex items-center justify-center space-x-4 mt-8">
      {currentPage > 1 && (
        <Link
          href={`/products?page=${currentPage - 1}`}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </Link>
      )}
      
      <span className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md">
        Page {currentPage}
      </span>
      
      {hasMore && (
        <Link
          href={`/products?page=${currentPage + 1}`}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          Next
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      )}
    </div>
  );
};

const ProductsPage = ({ products, currentPage, hasMore }: ProductsPageProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Products</h1>
          <p className="text-gray-600">Discover our amazing collection of products</p>
        </div>
        
        <ProductsWithPagination 
          products={products} 
          currentPage={currentPage} 
          hasMore={hasMore} 
        />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = Number(context.query.page) || 1;
  const offset = (page - 1) * PRODUCTS_PER_PAGE;
  
  try {
    const products = await fetchProducts(offset, PRODUCTS_PER_PAGE + 1);
    const hasMore = products.length > PRODUCTS_PER_PAGE;
    const displayProducts = products.slice(0, PRODUCTS_PER_PAGE);

    return {
      props: {
        products: displayProducts,
        currentPage: page,
        hasMore,
      },
    };
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return {
      props: {
        products: [],
        currentPage: page,
        hasMore: false,
      },
    };
  }
};

export default ProductsPage;
