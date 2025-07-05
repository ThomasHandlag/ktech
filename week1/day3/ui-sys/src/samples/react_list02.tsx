import tainghe from "../assets/images/samples/tainghe.jpg";
import cusac from "../assets/images/samples/cusac.jpg";
import daysac from "../assets/images/samples/daysac.jpeg";
import chuyendoi from "../assets/images/samples/chuyendoi.jpg";
import List02Item from "./list02_item";

const mockData = [
  {
    image: tainghe,
    title: "Tai nghe Bluetooth Sony WH-1000XM4",
    price: "3.500.000đ",
    discount: "4.500.000đ",
    percentage: "22",
  },
  {
    image: cusac,
    title: "Củ sac Anker PowerPort III Nano",
    price: "4.200.000đ",
    discount: "5.500.000đ",
    percentage: "24",
  },
  {
    image: daysac,
    title: "Dây xạc Anker PowerLine III USB-C to USB-C",
    price: "3.000.000đ",
    discount: "3.800.000đ",
    percentage: "21",
  },
  {
    image: chuyendoi,
    title: "Cáp chuyển đổi USB-C sang HDMI Anker",
    price: "2.800.000đ",
    discount: "3.200.000đ",
    percentage: "12",
  },
];

const ReactList02 = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-row justify-between w-full">
        <div className="text-xl font-bold">Phụ kiện tương thích</div>
      </div>
      <div className="flex flex-row p-4">
        {mockData.map((item, index) => (
            <List02Item
                discount={item.discount}
                image={item.image}
                key={index}
                percentage={item.percentage}
                price={item.price}
                title={item.title}
            />
        )
          )}
      </div>
    </div>
  );
};

export default ReactList02;
