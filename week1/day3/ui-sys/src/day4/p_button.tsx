import * as React from "react";

type PButtonProps = {
  leading?: React.ReactElement;
  trailing?: React.ReactElement;
  children?: React.ReactElement;
  onClick?: () => void;
  className?: string;
};

const PButton = (props: PButtonProps) => {
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

export default PButton;