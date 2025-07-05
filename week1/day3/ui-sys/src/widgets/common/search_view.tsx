import { useState } from "react";
import TextField from "./text_field";
import { FaSearch } from "react-icons/fa";

export const querytOnType = "onType";
export const querytOnEnter = "onEnter";

type SearchViewProps = {
  onSearchResult: (query: string) => string[] | number[];
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  action?: string;
};

const SearchView = ({
  onSearchResult,
  placeholder = "Search...",
  className = "",
  style = {},
}: SearchViewProps) => {
  const [query, setQuery] = useState<string>("");

  const [queryResults, setQueryResults] = useState<string[] | number[]>([]);

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key === "Enter") {
      setQueryResults([]);
      event.preventDefault();
      setQueryResults(onSearchResult(query));
    }
  };

  const handleClick = () => {
    setQueryResults([]);
    setQueryResults(onSearchResult(query));
  };

  return (
    <div className={`relative inline-block ${className}`} style={style}>
      <TextField
        leading={<span className="text-gray-500">Search:</span>}
        placeholder={placeholder}
        className="flex-grow"
        onChange={(e): undefined => {
          setQuery(e.target.value);
        }}
        value={query}
        onKeyDown={handleKeyDown}
        trailing={
          <button onClick={handleClick}>
            <FaSearch />
          </button>
        }
      />
      {queryResults.length > 0 && (
        <div className="absolute grow z-5 border origin-top-right shadow-lg p-4 mt-2 rounded max-h-[300px] overflow-y-auto bg-white">
          <div className="space-y-2">
            {queryResults.map((item, index) => (
              <option className="" key={index} value={item}>
                {item}
              </option>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchView;
