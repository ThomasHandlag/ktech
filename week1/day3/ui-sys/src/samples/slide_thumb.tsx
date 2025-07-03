import { useState } from "react";
import { RiArrowDropLeftLine, RiArrowDropRightLine } from "react-icons/ri";

type SlideThumbProps = {
  items: React.ReactElement[];
};

const SlideThumb = (props: SlideThumbProps) => {
  const [index, setIndex] = useState<number>(0);

  const handlePrev = () => {
    setIndex((prev) => (prev > 0 ? prev - 1 : props.items.length - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev < props.items.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row gap-5 items-center justify-center ">
        <button
          className="py-2 px-1 bg-gray-200 rounded-md"
          onClick={handlePrev}
        >
          <RiArrowDropLeftLine size={24} />
        </button>
        <div className="w-[200px] h-[250px]">{props.items[index]}</div>
        <button
          className="py-2 px-1 bg-gray-200 rounded-md"
          onClick={handleNext}
        >
          <RiArrowDropRightLine size={24} />
        </button>
      </div>
      <div className="flex flex-row gap-2 mt-2">
        {props.items.map((item, idx) => (
          <button
            key={idx}
            className={`w-10 h-10 overflow-hidden ${
              index === idx ? "border-2 border-red-500" : ""
            }`}
            onClick={() => setIndex(idx)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SlideThumb;
