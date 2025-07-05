import { useState } from "react";

interface TextAreaProps {
  id: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  maxLength?: number;
  rows?: number;
  counter?: boolean;
  onError?: (value: string) => string | null;
}

const TextArea = (props: TextAreaProps) => {
  const [value, setValue] = useState(props.value || "");

  const handleChange = (newValue: string) => {
    setValue(newValue);
    props.onChange?.(newValue);
  };

  return (
    <div className={`flex flex-col ${props.className}`}>
      {props.label && (
        <label htmlFor={props.id} className="mb-2 text-sm font-medium">
          {props.label}
        </label>
      )}
      <textarea
        id={props.id}
        rows={props.rows || 4}
        maxLength={props.maxLength}
        placeholder={props.placeholder}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        className="border border-gray-300 p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {props.counter && (
        <div className="text-right text-xs text-gray-500 mt-1">
          {value?.length || 0}/{props.maxLength || 200}
        </div>
      )}
      {props.onError && (
        <span className="text-red-500 text-xs mt-1">
          {props.onError(value)}
        </span>
      )}
    </div>
  );
};

export default TextArea;
