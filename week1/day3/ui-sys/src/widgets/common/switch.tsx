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
  checkedClass,
  uncheckedClass,
  style,
}: SwitchProps) => {
  const handleChange = (value: boolean) => {
    onChange?.(value);
  };

  return (
    <button
      onClick={() => handleChange(!checked)}
      style={{ ...style }}
      className={`${className} ${checked ? checkedClass : uncheckedClass}`}
    >
      <span
        className={`bg-indigo-500 w-12 h-12 rounded-full text-sm px-2 transition-all ease-in duration-300 ${
          checked ? "translate-x-12" : "translate-x-0"
        }`}
      ></span>
    </button>
  );
};

export default Switch;
