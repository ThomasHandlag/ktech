import type { Catergory } from "./item";
import SelectedBtn from "../selected_btn";

type FilterProps = {
  onFilterChange?: (filters: { id: number }) => undefined;
  categories?: Catergory[];
  loading?: boolean;
  selectedCategory: number | undefined;
};

const FilterSidebar = (props: FilterProps) => {
  return (
    <div className="flex flex-col shrink p-4 gap-2 sticky top-[90px] h-full bg-white shadow-md">
      <span className="text-2xl font-semibold">Bộ lọc</span>
      <SelectedBtn isSelected={props.selectedCategory == 0} label="All" onClick={() => {
        if (props.onFilterChange) {
          props.onFilterChange({
            id: 0,
          });
        }
      }} />
      {props.loading ? (
        <div className="bg-gray-400 w-full h-full"></div>
      ) : (
        props.categories?.map((category) => (
          <SelectedBtn
            key={category.id}
            isSelected={props.selectedCategory === category.id}
            label={category.name}
            onClick={() => {
              if (props.onFilterChange) {
                props.onFilterChange({
                  id: category.id,
                });
              }
            }}
          />
        ))
      )}
    </div>
  );
};

export default FilterSidebar;
