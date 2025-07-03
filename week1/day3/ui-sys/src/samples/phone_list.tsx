import { useState } from "react";
import iphone1 from "../assets/images/samples/iphone1.png";
import iphone2 from "../assets/images/samples/iphone2.png";
import iphone3 from "../assets/images/samples/iphone5.png";
import iphone4 from "../assets/images/samples/iphone6.png";
import { IoIosCloseCircle } from "react-icons/io";

type Item = {
  image: string;
  name: string;
  id: number;
  des: string;
};

const phoneList: Item[] = [
  {
    image: iphone1,
    name: "iPhone 14 Pro Max",
    id: 1,
    des: "4.410.000 ₫",
  },
  {
    image: iphone2,
    name: "iPhone 14 Pro",
    id: 2,
    des: "3.410.000 ₫",
  },
  {
    image: iphone4,
    name: "iPhone 14",
    id: 4,
    des: "Ngừng kinh doanh",
  },
  {
    image: iphone3,
    name: "iPhone 14 Plus",
    id: 3,
    des: "2.410.000 ₫",
  },
];

type PhoneItemProps = {
  image: string;
  name: string;
  id: number;
  des: string;
  onRemoveItem: (id: number) => void;
};

const PhoneItem = (props: PhoneItemProps) => {
  const { image, name, id, des, onRemoveItem } = props;

  return (
    <div className="flex flex-row p-2 border justify-between border-gray-200 rounded-md gap-2 items-start  h-[60px]">
      <div className="flex flex-row gap-2">
        <img src={image} width={30} height={50} className="object-fill" />
        <div className="flex flex-col justify-between">
          <span>{name}</span>
          <span className="text-red-500 text-sm">{des}</span>
        </div>
      </div>
      <button
        onClick={() => onRemoveItem(id)}
        className="text-gray-400 p-2 rounded-full"
      >
        <IoIosCloseCircle />
      </button>
    </div>
  );
};

const PhoneList = () => {
  const [list, setList] = useState<Item[]>(phoneList);

  const onRemoveItem = (id: number) => {
    setList((prevList) => prevList.filter((item) => item.id !== id));
  };

  const removeAllItems = () => {
    setList([]);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row justify-between ">
        <span className="text-2xl font-bold mb-4">Sản phẩm đã xem</span>
        <button onClick={removeAllItems} className="text-gray-400 text-xs">
          Xóa lịch sử
        </button>
      </div>
      <div className="flex flex-row gap-4 flex-wrap items-center lg:justify-center">
        {list.map((item) => (
          <PhoneItem key={item.id} {...item} onRemoveItem={onRemoveItem} />
        ))}
      </div>
    </div>
  );
};

export default PhoneList;
