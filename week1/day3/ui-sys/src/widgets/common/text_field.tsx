import type { KeyboardEventHandler } from "react";
import React from "react";

type TextFieldProps = {
  leading?: React.ReactElement;
  trailing?: React.ReactElement;
  placeholder?: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => undefined;
  value?: string;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  disabled?: boolean;
  required?: boolean;
  type?: "text" | "password" | "email" | "number" | "date" | "tel" | "file";
  autoComplete?: "on" | "off";
  id?: string;
};

const TextField = (props: TextFieldProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange?.(event);
  };

  return (
    <div
      className={`flex items-center flex-row w-[400px] px-4 bg-white shadow-md rounded-xl ${props.className}`}
    >
      {props.leading}
      <input
        id={props.id}
        type={props.type}
        disabled={props.disabled}
        required={props.required}
        autoComplete={props.autoComplete}
        data-testid="text-field"
        placeholder={props.placeholder}
        className={
          "bg-transparent flex-grow p-2 focus:ring-transparent focus:outline-none"
        }
        onChange={handleChange}
        value={props.value}
        onKeyDown={props.onKeyDown}
      />
      {props.trailing}
    </div>
  );
};

export default TextField;
