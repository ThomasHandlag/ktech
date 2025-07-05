import { useState } from "react";

// radio input
type RadioGroupProps = {
  label?: string;
  options: { label: string; value: string }[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
  optionClass?: string;
  disabled?: boolean;
  inputClass?: string;
  name?: string;
  id?: string;
};

const RadioGroup = (props: RadioGroupProps) => {
  const { label, onChange, className } = props;

  const [value, setValue] = useState(props.options[0].value || "");

  const handleChange = (newValue: string) => {
    setValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div
      id={props.id}
      className={`${className ?? "flex flex-col justify-start"}`}
    >
      {label && <label className="text-gray-700 mb-2">{label}</label>}
      <div className={props.optionClass ?? "flex flex-col gap-2"}>
        {props.options.map((option) => (
          <label
            key={option.value}
            className="flex flex-row items-center capitalize gap-2"
          >
            <input
              type="radio"
              disabled={props.disabled}
              checked={value === option.value}
              name={props.name}
              value={option.value}
              onChange={() => handleChange(option.value)}
              className={props.inputClass ?? "p-2"}
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;
export type { RadioGroupProps };
