type ProgressIndicatorProps = {
  value?: string;
  trailing?: React.ReactElement;
  indicatorColor?: string;
  height?: string;
  width?: string;
  className?: string;
};

const ProgressIndicator = ({
  value,
  trailing,
  indicatorColor = "#11FF11",
  height = "2px",
  width = "200px",
  className,
}: ProgressIndicatorProps) => {
  return (
    <div className="flex flex-row items-center justify-center gap-2">
      <div
        className={"bg-gray-200 " + className}
        style={{ width: width, height: height }}
      >
        <div
          className={"" + className}
          style={{
            width: value,
            height: height,
            backgroundColor: indicatorColor,
          }}
        ></div>
      </div>
      {trailing}
    </div>
  );
};

export default ProgressIndicator;
