import { useState } from "react";
import TextField from "./text_field";

type InputFileProps = {
  label?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  type?: "text" | "password" | "email" | "number" | "date" | "tel" | "file";
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  onError?: (value: File) => string | null;
  indicator?: React.ReactNode;
  id?: string;
  autoComplete?: "on" | "off";
};

const InputFileField = (props: InputFileProps) => {
  const [, setFile] = useState<File | null>(null);

  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): undefined => {
    const files = event.target.files;
    if (files?.length === 0) {
      return;
    } else {
      const newValue = files![0];
      setFile(newValue);
      if (props.onError) {
        const errorMessage = props.onError(newValue);
        setError(errorMessage || null);
      }
      if (props.onChange) {
        props.onChange(event);
      }
    }
  };

  return (
    <div className="grid grid-rows-[auto_1fr] items-start justify-center">
      <label className="text-gray-700">{props.label}</label>
      <TextField
        onChange={handleChange}
        className="border border-gray-300"
        id={props.id}
        placeholder={props.placeholder}
        disabled={props.disabled}
        required={props.required ?? false}
        autoComplete={props.autoComplete}
        type={props.type}
      />
      {props.indicator}
      <span className="text-red-500 text-sm">{error}</span>
    </div>
  );
};

export default InputFileField;
