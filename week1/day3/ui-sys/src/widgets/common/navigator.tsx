type NavigatorProps = {
  onPageChange?: (page: number) => void;
  items?: React.ReactElement[];
  className?: string;
};

const Navigator = ({ onPageChange, items, className }: NavigatorProps) => {
  return <nav className={`fixed ${className}`}>
    {items?.map((item, index) => (
      <button
        key={index}
        className="cursor-pointer"
        onClick={() => onPageChange?.(index)}
      >
        {item}
      </button>
    ))}
  </nav>;
};

export default Navigator;
