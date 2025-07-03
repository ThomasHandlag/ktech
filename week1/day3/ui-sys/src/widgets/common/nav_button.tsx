type NavButtonProps = {
  label: string;
  className?: string;
  style?: React.CSSProperties;
  selectedClass?: string;
  idleClass?: string;
  selected?: boolean;
};

const NavButton = ({
  label,
  className,
  selectedClass,
  idleClass = "bg-indigo-500",
  style,
  selected = false,
}: NavButtonProps) => {
  return (
    <div
      className={`${className} ${selected ? selectedClass : idleClass}`}
      style={{ ...style }}
    >
      {label}
    </div>
  );
};

export default NavButton;
