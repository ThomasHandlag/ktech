import { useEffect, useState } from "react";
import FilterSidebar from "../widgets/filter_sidebar";
import type { Catergory } from "../widgets/item";
import { baseUrl } from "../day7practice";
import { Outlet, useNavigate } from "react-router";

const Products = () => {
  const [catergories, setCategories] = useState<Catergory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      const response = await fetch(`${baseUrl}/categories`, { method: "GET" });
      try {
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory === 0) {
      navigate("0");
    }
  }, [catergories, navigate]);

  return (
    <div className="flex item-start justify-between gap-5">
      <FilterSidebar
        categories={catergories}
        selectedCategory={selectedCategory}
        onFilterChange={(e) => {
          setSelectedCategory(e.id);
          navigate(`${e.id}`);
        }}
        loading={loading}
      />
      <Outlet />
    </div>
  );
};

export default Products;
