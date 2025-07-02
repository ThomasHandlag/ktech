type TextFieldProps = {
  leading?: React.ReactElement;
  trailing?: React.ReactElement;
  placeholder?: string;
  className?: string;
  onChange?: (value: string) => void;
  value?: string;
};

const TextField = ({
  leading,
  trailing,
  placeholder,
  className,
  onChange,
  value,
}: TextFieldProps) => {
  return (
    <div className="flex items-center flex-row w-[400px] px-4 bg-white shadow-md rounded-xl ">
      {leading}
      <input
        type="text"
        placeholder={placeholder}
        className={"bg-transparent flex-grow p-2 focus:ring-transparent focus:outline-none " + className}
        onChange={(e) => onChange && onChange(e.target.value)}
        value={value}
      />
      {trailing}
    </div>
  );
};

export default TextField;
