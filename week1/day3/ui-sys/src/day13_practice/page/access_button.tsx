interface AcessButtonProps {
  roles?: string[];
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const allowedRoles: string[] = ["Administrators", "Managers"];

const AccessButton = ({
  roles,
  onClick,
  children,
  className,
}: AcessButtonProps) => {
  const hasAccess = roles?.some((role) => allowedRoles.includes(role));

  return hasAccess ? (
    <button
      onClick={onClick}
      className={`${className ?? "bg-blue-500 text-white py-2 px-4 rounded"} `}
    >
      {children}
    </button>
  ) : null;
};

export default AccessButton;
