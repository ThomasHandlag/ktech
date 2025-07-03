import { useState } from "react";
import { StarBtn } from "./rate";

const Rate2 = () => {
  const [rate, setRate] = useState<number>(0);

  const textWhenRate = (rate: number): string => {
    switch (rate) {
      case 0:
        return "Really bad";
      case 1:
        return "Bad";
      case 2:
        return "Normal";
      case 3:
        return "Amazing";
      case 4:
        return "Excellently!";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-row justify-center items-center gap-2">
      <div className="flex flex-row justify-center items-center">
        {Array.from({ length: 5 }, (_, index) => (
          <StarBtn id={rate} onClick={setRate} index={index} />
        ))}
      </div>
      <span className="">{textWhenRate(rate)}</span>
    </div>
  );
};

export default Rate2;
