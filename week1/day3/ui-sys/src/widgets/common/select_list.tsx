type SelectListProps = {
  options: string[] | number[];
  onChange?: (value: string | number) => void;
  value?: string | number;
  className?: string;
  label?: string;
  disabled?: boolean;
  id?: string;
};

const SelectList = ({
  options,
  onChange,
  value,
  className = "",
  label,
  disabled = false,
  id,
}: SelectListProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange?.(event.target.value);
  };

  return (
    <div className="grid grid-row-[auto_1fr]">
      {label && <label className="text-gray-700">{label}</label>}
      <select
        id={id}
        value={value}
        disabled={options.length === 0 || disabled}
        onChange={handleChange}
        className={`bg-white border border-gray-300 rounded-md p-2 ${className}`}
      >
        {Array.isArray(options) &&
          options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
      </select>
    </div>
  );
};

export default SelectList;
