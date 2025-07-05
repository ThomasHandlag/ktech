import { useState } from "react";

type CheckboxProps = {
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => undefined;
  className?: string;
  label?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  id?: string;
  value?: string;
};

const Checkbox = ({
  checked = false,
  onChange,
  className = "",
  label,
  style,
  disabled = false,
  id,
}: CheckboxProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
  };

  const [isChecked, setIsChecked] = useState(checked ?? false);

  return (
    <label
      className={`flex items-center cursor-pointer ${className}`}
      style={style}
    >
      <input
        type="checkbox"
        id={id}
        disabled={disabled}
        value={label}
        checked={isChecked}
        onChange={(e) => {
          setIsChecked(e.target.checked);
          handleChange(e);
        }}
        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
      />
      {label && <span className="ml-2">{label}</span>}
    </label>
  );
};

export default Checkbox;
