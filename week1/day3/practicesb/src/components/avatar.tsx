type AvatarProps = {
  url: string;
  className?: string;
  size?: number;
};

const Avatar = ({ url, className, size = 20 }: AvatarProps) => {
  return (
    <div
      className={
        "rounded-full overflow-hidden flex items-center justify-center shadow-md  " +
        className
      }
    >
      <img className="object-fill" src={url} width={size} height={size} />
    </div>
  );
};

export default Avatar;
