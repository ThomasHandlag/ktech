import { useState } from "react";
import TextField from "./text_field";

type TextFormFieldProps = {
  label?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  type?: "text" | "password" | "email" | "number" | "date" | "tel" | "file";
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  onError?: (value: string) => string | null;
  indicator?: React.ReactNode;
  id?: string;
  autoComplete?: "on" | "off";
};

const TextFormField = (props: TextFormFieldProps) => {
  const [text, setText] = useState<string>(props.value || "");

  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): undefined => {
    const newValue = event.target.value;
    setText(newValue);
    if (props.onError) {
      const errorMessage = props.onError(newValue);
      setError(errorMessage || null);
    }
    if (props.onChange) {
      props.onChange(event);
    }
  };

  return (
    <div className="grid grid-rows-[auto_1fr] items-start justify-center">
      <label className="text-gray-700">{props.label}</label>
      <TextField
        onChange={handleChange}
        className={`${props.className} border border-gray-300`}
        id={props.id}
        placeholder={props.placeholder}
        disabled={props.disabled}
        required={props.required}
        autoComplete={props.autoComplete}
        value={text}
        type={props.type}
      />
      {props.indicator}
      <span className="text-red-500 text-sm">{error}</span>
    </div>
  );
};

export default TextFormField;
