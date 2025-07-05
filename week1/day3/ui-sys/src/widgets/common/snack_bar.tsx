import { useState, useEffect } from "react";

type SnackBarProps = {
  duration?: number; 
  message: string;
  className?: string;
  style?: React.CSSProperties;
};

const SnackBar = (props: SnackBarProps) => {
  const [visible, setVisible] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, props.duration || 3000); 

    return () => clearTimeout(timer);
  }, [props.duration]);

  return (
    <div
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 ${
        props.className || "px-4 py-2 rounded shadow-lg"
      } ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-0.5"
      } transition-all duration-300 ease-in-out`}
    >
      {props.message}
    </div>
  );
};

export default SnackBar;
