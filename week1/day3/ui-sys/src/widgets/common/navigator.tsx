type NavigatorProps = {
  onPageChange?: (page: number) => void;
  items?: React.ReactNode[];
  className?: string;
};

const Navigator = ({ onPageChange, items, className }: NavigatorProps) => {
  return <nav className={`top-0 ${className}`}>
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
