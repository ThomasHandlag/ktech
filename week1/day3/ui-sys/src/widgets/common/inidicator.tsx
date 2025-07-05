type IndicatorProps = {
  className?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  label?: string;
  readonly?: boolean;
  style?: React.CSSProperties;
  count?: number;
  contentClass?: string;
};

const Indicator = (props: IndicatorProps) => {
  return (
    <div className={props.className} style={props.style}>
      {Array.from({ length: props.count ?? 5 }, (_, index) => (
        <button
          onClick={props.onClick}
          onMouseEnter={props.onMouseEnter}
          onMouseLeave={props.onMouseLeave}
          disabled={props.readonly}
          key={index}
          className={`${
            props.contentClass ?? "w-4 h-4 bg-blue-500 rounded-full"
          }`}
          style={props.style}
        ></button>
      ))}
    </div>
  );
};

export default Indicator;
