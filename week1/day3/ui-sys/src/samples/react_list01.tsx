import List01Item from "./list01_item";

const mockData = [
  {
    image:
      "https://i.pinimg.com/736x/b5/c2/6d/b5c26de164a40e31837507d98f9f38fb.jpg",
    title:
      "Ấn tượng đầu tiên Iphone 15 Pro Max, với camera 5x zoom quang học, 64GB RAM, và chip A17 Pro",
    counter: 145,
  },
  {
    image:
      "https://i.pinimg.com/736x/bd/0d/65/bd0d6536c050cf3aeb7ce006717d469b.jpg",
    title:
      "Iphone 15 Pro Max: Đánh giá chi tiết về camera, hiệu năng và thiết kế",
    counter: 532,
  },
  {
    image:
      "https://i.pinimg.com/736x/ba/21/97/ba219732af5748afc907c731c4bee85b.jpg",
    title:
      "Rầm rộ tin đồn về Iphone 16 với bước tiến đột phá trong công nghệ hiển thị",
    counter: 13,
  },
  {
    image:
      "https://i.pinimg.com/736x/ba/21/97/ba219732af5748afc907c731c4bee85b.jpg",
    title:
      "Iphone 13 pro max: Đánh giá chi tiết về camera, hiệu năng và thiết kế",
    counter: 903,
  },
];

const ReactList01 = () => {
  return (
    <div className="flex flex-col gap-10 w-[1200px] bg-gray-100 py-4 px-2">
      <div className="flex flex-row justify-between items-center">
        <span className="uppercase text-xl font-bold">tin mới</span>
        <span>Xem thêm</span>
      </div>
      <div className="flex flex-row gap-10 justify-between">
        {mockData.map((item, index) => (
          <List01Item
            key={index}
            image={item.image}
            title={item.title}
            counter={item.counter}
          />
        ))}
      </div>
    </div>
  );
};

export default ReactList01;
