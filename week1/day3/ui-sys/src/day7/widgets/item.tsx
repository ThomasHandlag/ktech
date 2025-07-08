export type ItemPropsDay7 = {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  categoryId: number;
  images: string;
}

export type Catergory = {
  id: number;
  name: string;
  image:string;
  slug: string;
}

const ItemDay7 = (props: ItemPropsDay7) => {
  return (
    <div className="flex flex-col items-start">
      <img
        src={props.images}
        alt={props.title}
        className="w-full object-cover mb-4"
      />
      <h2 className="text-lg font-semibold mb-2">{props.title}</h2>
      <span className="text-gray-500 font-bold">${props.price}</span>
    </div>
  );
};

export default ItemDay7;
