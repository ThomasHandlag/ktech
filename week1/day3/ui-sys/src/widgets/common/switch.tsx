import { useState } from "react";

type SwitchProps = {
  onChange?: (checked: boolean) => void;
  checked?: boolean;
  className?: string;
  child?: React.ReactElement;
  checkedClass?: string;
  uncheckedClass?: string;
  style?: React.CSSProperties;
};

const Switch = ({
  onChange,
  checked,
  className,
  child,
  checkedClass,
  uncheckedClass,
  style,
}: SwitchProps) => {
  const [value, setChecked] = useState<boolean>(checked ?? false);

  const handleChange = (value: boolean) => {
    setChecked(value);
    onChange?.(value);
  };

  return (
    <button
      onClick={() => handleChange(!value)}
      style={{ ...style }}
      className={`${className} ${value ? checkedClass : uncheckedClass}`}
    >
      {child}
    </button>
  );
};

export default Switch;
