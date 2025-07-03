type Item = {
  image: string;
  title: string;
  price: string;
  discount: string;
  percentage: string;
};

const List02Item = (props: Item) => {
  return (
    <div className="flex flex-col items-start justify-start p-4 ">
      <div className="relative">
        <div className="absolute flex flex-row justify-end items-center top-0 right-0 z-10">
          <span className="bg-orange-500 px-4 py-2 text-white rounded-md">
            -{props.percentage}%
          </span>
        </div>
        <img
          src={props.image}
          alt={props.title}
          className="w-[200px] h-[200px] mb-2 object-fill z-0"
        />
      </div>
      <h3 className="text-lg w-[200px] font-semibold">{props.title}</h3>
      <div className="flex flex-row justify-start items-center w-[200px] gap-2">
        <span className="text-red-500">{props.price}</span>
        <span className="line-through text-gray-400">{props.discount}</span>
      </div>
    </div>
  );
};

export default List02Item;
