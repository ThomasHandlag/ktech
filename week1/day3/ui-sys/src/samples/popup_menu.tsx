// src/components/PopupMenu.jsx
import { useState } from "react";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { TfiClose } from "react-icons/tfi";

type PopupMenuProps = {
  onSelect: (option: string) => void;
  label: string;
  options: string[];
  icon?: React.ReactNode;
};

const PopupMenu = (props: PopupMenuProps) => {
  const { label, options, icon } = props;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 border border-gray-300 rounded-3xl flex flex-row items-center"
      >
        {label}
        {icon || <MdOutlineArrowDropDown />}
      </button>
      {isOpen && (
        <div className="absolute bg-white border shadow-lg p-4 mt-2 rounded">
          <div className="flex flex-row items-start gap-2">
            <ul className="space-y-2">
              {options.map((option, index) => (
                <li
                  key={index}
                  onClick={() => {
                    props.onSelect(option);
                    setIsOpen(false);
                  }}
                  className="cursor-pointer hover:bg-gray-100 p-2 rounded"
                >
                  {option}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setIsOpen(false)}
              className="ml-auto text-gray-500 border border-gray-300 rounded-full p-1 "
            >
              <TfiClose size={10} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupMenu;
