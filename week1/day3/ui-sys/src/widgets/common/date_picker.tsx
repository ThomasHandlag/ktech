import { useState } from "react";

type DatePickerProps = {
  label?: string;
  onChange?: (value: string) => void;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  onError?: (value: string) => string | null;
  id?: string;
};

const DatePicker = (props: DatePickerProps) => {
  const [date, setDate] = useState<string>("");

  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value;
    setDate(newValue);
    if (props.onError) {
      const errorMessage = props.onError(newValue);
      setError(errorMessage || null);
    } else {
      setError(null);
    }
    if (props.onChange) {
      props.onChange(newValue);
    }
  };

  return (
    <div className="grid grid-row-[auto_1fr]">
      {props.label && <label className="text-gray-700">{props.label}</label>}
      <input
        id={props.id}
        onChange={handleChange}
        value={date}
        inputMode="text"
        type="date"
        className={`bg-transparent p-2 border border-gray-300 ${props.className}`}
        disabled={props.disabled}
        required={props.required}
      />
      <span className="text-red-500">{error}</span>
    </div>
  );
};

export default DatePicker;
