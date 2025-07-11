import { useState } from "react";
import MButton from "../widgets/common/m_button";

const NumberBtn = ({
  className,
  onClick,
  label,
}: {
  className?: string;
  onClick?: () => void;
  label: string;
}) => {
  return (
    <MButton
      onClick={onClick}
      className={`col-span-1 p-5 text-white bg-black rounded-md ${className}`}
      children={label}
    />
  );
};

const OperatorBtn = ({
  className,
  onClick,
  label,
}: {
  className?: string;
  onClick?: () => void;
  label: string;
}) => {
  return (
    <MButton
      onClick={onClick}
      className={`col-span-1 p-5 text-white bg-yellow-500 rounded-md ${className}`}
      children={label}
    />
  );
};

const Day5Homework1 = () => {
  const [result, setResult] = useState<string>();

  const [value, setValue] = useState<string>("");

  const calculate = (value: string) => {
    const result = eval(value);
    setResult(result.toString());
  };

  const onCalBtnClick = (label: string) => {
    setValue((prev) => prev + label);
  };

  return (
      <div className="flex items-center justify-center p-10">
        <div className="grid grid-cols-4 p-4 border-2 border-gray-300 rounded-xl gap-2 w-1/4 h-1/2 ">
          <div className="col-span-4 grid grid-row-2 bg-white p-2 border border-gray-400 rounded-3xl items-start">
            <span
              className={`${
                result === "" ? "text-gray-400 text-sm" : "text-3xl"
              }`}
            >
              {value === "" ? "0" : value}
            </span>
            <span className="captitalize">
              {result ? (result === "infinity" ? "error" : result) : ""}
            </span>
          </div>
          <NumberBtn onClick={() => onCalBtnClick("1")} label="1" />
          <NumberBtn onClick={() => onCalBtnClick("2")} label="2" />
          <NumberBtn onClick={() => onCalBtnClick("3")} label="3" />
          <OperatorBtn onClick={() => onCalBtnClick("+")} label="+" />
          <NumberBtn onClick={() => onCalBtnClick("4")} label="4" />
          <NumberBtn onClick={() => onCalBtnClick("5")} label="5" />
          <NumberBtn onClick={() => onCalBtnClick("6")} label="6" />
          <OperatorBtn onClick={() => onCalBtnClick("-")} label="-" />
          <NumberBtn onClick={() => onCalBtnClick("7")} label="7" />
          <NumberBtn onClick={() => onCalBtnClick("8")} label="8" />
          <NumberBtn onClick={() => onCalBtnClick("9")} label="9" />
          <OperatorBtn onClick={() => onCalBtnClick("*")} label="*" />
          <NumberBtn onClick={() => onCalBtnClick("0")} label="0" />
          <NumberBtn onClick={() => onCalBtnClick(".")} label="." />
          <MButton
            className="bg-red-500 col-span-1 rounded-md text-white"
            onClick={() => setValue("")}
            children="C"
          />
          <OperatorBtn onClick={() => onCalBtnClick("/")} label="/" />
          <MButton
            className="bg-green-500 py-4 rounded-md text-white col-span-4"
            onClick={() => calculate(value)}
            children="="
          />
        </div>
    </div>
  );
};

export default Day5Homework1;
