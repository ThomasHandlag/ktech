import * as React from "react";

type MButtonProps = {
  leading?: React.ReactElement;
  trailing?: React.ReactElement;
  children?: React.ReactElement;
  onClick?: () => void;
  className?: string;
};

const MButton = (props: MButtonProps) => {
  return (
    <>
      <button
        className={
          "flex items-center flex-row px-6 py-2 w-[300px] gap-2 " +
          props.className
        }
        onClick={props.onClick}
      >
        {props.leading}
        {props.children}
        {props.trailing}
      </button>
    </>
  );
};

export default MButton;
