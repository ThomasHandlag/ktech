import { useState } from "react";

type ButtonBarProps = {
  labels: string[];
  contents: string[];
  activeClass?: string;
  inactiveClass?: string;
  className?: string;
};

const ButtonBar = (props: ButtonBarProps) => {
  const { labels, contents } = props;
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  return (
    <div className="flex flex-col items-center justify-center w-[298px]">
      <div className="flex flex-row">
        {labels.map((label, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={`px-4 py-2 basis-96 ${props.className} ${
              selectedIndex === index
                ? props.activeClass || "bg-green-500 text-white"
                : props.inactiveClass || "bg-gray-200 text-gray-700"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="p-4 ">{contents[selectedIndex]}</div>
    </div>
  );
};

export default ButtonBar;
