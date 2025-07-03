type Item = {
    image: string;
    title: string;
    counter: number;
}

const List01Item = ({image, title, counter} : Item) => {
    return (
        <div className="flex flex-col items-start p-4 rounded-lg w-[300px]">
            <img src={image} alt={title} className="w-[300px] h-[100px] mb-2 rounded-[30px]" />
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-orange-700">{counter} lượt xem</p>
        </div>
    );
}


export default List01Item;