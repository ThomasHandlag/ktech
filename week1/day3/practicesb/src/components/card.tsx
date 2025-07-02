type CardProps = {
  header: React.ReactElement;
  content?: React.ReactElement;
  className?: string;
  rounded?: string;
};

const Card = ({
  header,
  content,
  className,
  rounded = "rounded-xl",
}: CardProps) => {
  return (
    <div
      className={
        "flex flex-col bg-white shadow-md w-[300px] " +
        className +
        " " +
        rounded
      }
    >
      {header}
      {content && <div className="text-sm text-gray-700">{content}</div>}
    </div>
  );
};

export default Card;
