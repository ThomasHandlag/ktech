import { useState } from "react";
import { FaStar } from "react-icons/fa";

const Rate = () => {
  const [rate, setRate] = useState<number>(0);

  const handleRateChange = (newRate: number) => {
    setRate(newRate);
  };

  return (
    <div className="flex flex-row gap-5">
      <span className="">Chọn đánh giá của bạn: </span>
      <div className="flex flex-row justify-center items-center">
        {Array.from({ length: 5 }, (_, index) => (
          <StarBtn key={index} id={rate} onClick={handleRateChange} index={index+1} />
        ))}
      </div>
      <span className="bg-green-400 text-white px-2 py-1">Bình thường</span>
    </div>
  );
};

type StarBtnProps = {
  id: number;
  onClick: (rate: number) => void;
  index: number;
};

export default Rate;

export const StarBtn = (props: StarBtnProps) => {
  const { id, onClick, index } = props;

  return (
    <button
      className={` ${id >= index ? "text-yellow-500" : "text-gray-300"}`}
      onClick={() => onClick(index)}
    >
      <FaStar />
    </button>
  );
};
