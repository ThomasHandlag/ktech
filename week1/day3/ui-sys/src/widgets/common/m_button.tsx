import * as React from "react";

type MButtonProps = {
  children?: React.ReactNode;
  onClick?: () => void;
  onDoubleClick?: () => void;
  className?: string;
  disabledClass?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

const MButton = (props: MButtonProps) => {
  return (
    <>
      <button
        disabled={props.disabled}
        type={props.type || "button"}
        onDoubleClick={props.onDoubleClick}
        style={props.style}
        className={
          props.className ||
          "flex items-center flex-row px-6 py-2 gap-2 disabled:bg-indigo-100 disabled:text-gray-500"
        }
        onClick={props.onClick}
      >
        {props.children}
      </button>
    </>
  );
};

export default MButton;
