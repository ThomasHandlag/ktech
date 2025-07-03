import { TiTick } from "react-icons/ti";

type ChipProps = {
  label: string;
  onClick?: () => void;
  className?: string;
  selected?: boolean;
};

const Chip = (props: ChipProps) => {
  return (
    <div className="relative inline-block overflow-hidden">
      <button
        onClick={props.onClick}
        className={`border px-3 py-1 bg-white ${props.className} ${
          props.selected ? " border-orange-500" : "border-gray-300"
        }`}
      >
        {props.label}
      </button>
      {props.selected && (
        <>
          <span className="ml text-white text-[8px] absolute right-0 bottom-0 z-1">
            <TiTick />
          </span>
          <span className="absolute right-0 bottom-0 w-4 h-4 bg-orange-500 rotate-45 translate-y-[5px] translate-x-[5px]"></span>
        </>
      )}
    </div>
  );
};

export default Chip;
