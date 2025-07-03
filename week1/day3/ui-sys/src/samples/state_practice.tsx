import { useState } from "react";
import Chip from "./chip";
import Rate from "./rate";
import PhoneList from "./phone_list";
import PopupMenu from "./popup_menu";
import { MdOutlineArrowDropDown } from "react-icons/md";
import Rate2 from "./rate2";
import SlideThumb from "./slide_thumb";
import daysac from "../assets/images/samples/daysac.jpeg";
import ButtonBar from "./button_bars";
import Accordions from "./accordion_btn";

const itemList = [
  {
    label: "Đen",
    id: 1,
  },
  {
    label: "Hồng",
    id: 2,
  },
  {
    label: "Xanh",
    id: 3,
  },
];

const StatePractice = () => {
  const [index, setIndex] = useState<number>(0);

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex flex-row gap-2 items-center justify-center">
        <span className="capitalize">màu:</span>
        {itemList.map((item, i) => (
          <Chip
            key={item.id}
            label={item.label}
            onClick={() => setIndex(i)}
            className="bg-gray-100"
            selected={index === i}
          />
        ))}
      </div>
      <Rate />
      <PhoneList />
      <div className="flex flex-row">
        <PopupMenu
          label="Sắp xếp"
          onSelect={() => {}}
          options={[
            "Sản phẩm nổi bật",
            "Giá từ thấp đến cao",
            "Giá từ cao đến thấp",
          ]}
          icon={<MdOutlineArrowDropDown />}
        />
        <PopupMenu
          label="Bộ nhớ trong"
          onSelect={() => {}}
          options={[]}
          icon={<MdOutlineArrowDropDown />}
        />
        <Rate2 />
        <SlideThumb
          items={Array.from({ length: 5 }, (_, i) => (
            <img
              key={i}
              src={daysac}
              alt={`Slide ${i}`}
              className="object-cover rounded-md"
            />
          ))}
        />
      </div>
      <ButtonBar
        labels={["Mô tả", "Đánh giá", "Thông số kỹ thuật"]}
        contents={[
          "Mô tả sản phẩm: Đây là một chiếc túi xách thời trang, được làm từ chất liệu cao cấp, thiết kế hiện đại.",
          "Đánh giá: Sản phẩm này rất đẹp và tiện dụng, tôi rất hài lòng với chất lượng.",
          "Thông số kỹ thuật: Kích thước 30x20x10 cm, trọng lượng 500g, màu sắc đa dạng.",
        ]}
        className="px-4 py-2"
      />

      <ButtonBar
        labels={["Mô tả", "Đánh giá", "Thông số kỹ thuật"]}
        contents={[
          "Mô tả sản phẩm: Đây là một chiếc túi xách thời trang, được làm từ chất liệu cao cấp, thiết kế hiện đại.",
          "Đánh giá: Sản phẩm này rất đẹp và tiện dụng, tôi rất hài lòng với chất lượng.",
          "Thông số kỹ thuật: Kích thước 30x20x10 cm, trọng lượng 500g, màu sắc đa dạng.",
        ]}
        activeClass="border-b-1 border-green-500"
        inactiveClass="bg-white"
        className="px-4 py-2"
      />
      <Accordions />
    </div>
  );
};

export default StatePractice;
