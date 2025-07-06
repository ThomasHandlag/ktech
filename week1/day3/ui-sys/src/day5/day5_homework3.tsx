import { useState } from "react";
import logo from "./logo.png"; // Placeholder for logo image
import { FiMenu } from "react-icons/fi";
import { BiCart } from "react-icons/bi";
import MButton from "../widgets/common/m_button";
import { FaSearch } from "react-icons/fa";
import { PiPlus } from "react-icons/pi";
import thitbe from "./thitbe.png"; // Placeholder for product image
import { GrClose } from "react-icons/gr";
import TextField from "../widgets/common/text_field";
import { CartContext, useCart, type CartItem } from "./home_work3_const";

export type Product = {
  id: number;
  name: string;
  price: number;
};

const Day5Homework3 = () => {
  const categories: string[] = [
    "Gia vị",
    "Gạo, bún, phở, miến",
    "Đồ hộp, thực phẩm sơ chế đóng gói",
    "Bột các loại",
    "Bánh đa nem, ram",
    "Hạt các loại",
    "Mộc nhĩ, măng khô",
  ];

  const products = [
    {
      id: 1,
      name: "Bột Xốt Nấu Demiglace Knorr 1kg",
      price: 315000,
    },
    {
      id: 2,
      name: "Nước Tương Kikkoman 1L",
      price: 180000,
    },
    {
      id: 3,
      name: "Bánh Đa Đô Lương Nghệ An 5 chiếc/túi",
      price: 25000,
    },
    {
      id: 4,
      name: "Sốt Worcestershire Lea & Perrins 290Ml",
      price: 150000,
    },
    {
      id: 5,
      name: "Mắm nêm ngon pha sẵn Thuận Phát",
      price: 22000,
      image: "https://via.placeholder.com/150x150?text=Mam+Nem+Thuan+Phat",
      unit: "",
    },
  ];

  return (
    <div className="bg-gray-100 font-sans">
      <CartProvider
        children={[
          <Header />,
          <div className="flex pt-4 relative">
            <main className="flex-1 px-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 hidden lg:flex">
                Thực phẩm khô
              </h2>
              <div className="mb-6 hidden lg:flex">
                <CategoryTabs categories={categories} />
              </div>
              <div className="justify-between items-center mb-6 flex">
                <h3 className="text-xl font-semibold text-gray-700">
                  Thực phẩm khô
                </h3>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600">Sắp xếp theo:</span>
                  <select className="border border-gray-300 rounded-md px-3 py-1 text-gray-700">
                    <option>Giá tăng</option>
                    <option>Giá giảm</option>
                    <option>Mới nhất</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </main>
          </div>,
        ]}
      />
    </div>
  );
};

export default Day5Homework3;

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addItem = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === product.id
      );

      if (existingItemIndex > -1) {
        const existingItem = prevItems[existingItemIndex];
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = updatedItem;
        return updatedItems;
      } else {
        return prevItems.concat({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        });
      }
    });
  };

  const decreaseItem = (productId: number) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === productId
      );
      if (existingItemIndex < 0) {
        return prevItems;
      }

      const existingItem = prevItems[existingItemIndex];

      if (existingItem.quantity === 1) {
        return prevItems.filter((item) => item.id !== productId);
      } else {
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity - 1,
        };
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = updatedItem;
        return updatedItems;
      }
    });
  };

  const removeItem = (productId: number) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === productId
      );
      if (existingItemIndex < 0) {
        return prevItems;
      }

      return prevItems.filter((item) => item.id !== productId);
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: cartItems,
        addItem: addItem,
        removeItem: removeItem,
        decreaseItem: decreaseItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const Header = () => {
  const [showCart, setShowCart] = useState(false);

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  return (
    <header className="bg-white p-4 shadow-md flex flex-row items-center w-full lg:gap-2">
      <div className="flex items-center lg:flex-row space-x-4 flex-row-reverse justify-between">
        <img src={logo} alt="Big Market Logo" className="lg:h-10 h-8" />
        <button className="flex items-center justify-center px-2 py-2 bg-white rounded-md text-gray-700 border border-gray-300">
          <FiMenu />
          <span className="hidden lg:flex">Danh mục sản phẩm</span>
        </button>
      </div>
      <div className="flex-grow lg:flex hidden">
        <TextField
          placeholder="Tìm kiếm sản phẩm"
          className="flex-grow max-w-md border border-gray-300 rounded-md"
          trailing={
            <span className="text-gray-500">
              <FaSearch size={16} />
            </span>
          }
        />
      </div>
      <CartButton visible={showCart} onClick={toggleCart} />
    </header>
  );
};

const CartButton = ({
  visible,
  onClick,
}: {
  visible: boolean;
  onClick: (show: boolean) => void;
}) => {
  const { cartItems } = useCart();
  return (
    <div>
      <button
        onMouseEnter={() => onClick(true)}
        onClick={() => onClick(!visible)}
        className="flex items-center justify-center p-2 bg-white text-gray-500 hover:bg-gray-100 transition-colors"
      >
        <BiCart size={24} />
        <span className="text-wrap xl:text-lg text-xs">
          Giỏ hàng của bạn ({cartItems.length}) sản phẩm
        </span>
      </button>
      {visible && (
        <CartSidebar
          onMouseLeave={() => onClick(false)}
          cartItems={cartItems}
        />
      )}
    </div>
  );
};

const CartSidebar = ({
  cartItems,
  onMouseLeave,
}: {
  cartItems: CartItem[];
  onMouseLeave: () => void;
}) => {
  let total = 0;
  cartItems.forEach((item) => {
    total += item.price * item.quantity;
  });

  const {removeItem} = useCart();

  const isMobile = window.innerWidth < 768;

  return (
    <div
      className={`lg:w-80 w-full absolute bg-white shadow-lg p-6 z-5 h-[500px] overflow-y-auto ${isMobile ? "left-0" : "right-4"}`}
      onMouseLeave={onMouseLeave}
    >
      <h3 className="text-gray-700 text-sm font-semibold mb-4">
        Giỏ hàng của bạn
      </h3>
      <div className="space-y-4">
        {cartItems.map((item: Product) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b pb-2"
          >
            <div className="flex items-center space-x-3">
              <button className="text-gray-400 hover:text-red-500" onClick={removeItem.bind(null, item.id)}>
                <GrClose size={16} />
              </button>
              <img
                src={thitbe}
                alt={item.name}
                className="w-12 h-12 object-cover rounded"
              />
              <div>
                <p className="text-sm font-medium text-gray-800">{item.name}</p>
                <p className="text-xs text-gray-500">
                  {item.price.toLocaleString("vi-VN")} ₫
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold text-gray-800">Tổng cộng</span>
          <span className="text-xl font-bold text-red-600">
            {total.toLocaleString("vi-VN")} ₫
          </span>
        </div>
        <button className="w-full bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600 transition-colors">
          Xem giỏ hàng
        </button>
      </div>
    </div>
  );
};

const CategoryTabs = ({ categories }: { categories: string[] }) => {
  return (
    <div className="flex space-x-2 border-b pb-2">
      {categories.map((category, index) => (
        <MButton
          key={index}
          className={
            "px-4 py-2 rounded-lg text-sm bg-white border border-green-400"
          }
          children={category}
        />
      ))}
    </div>
  );
};

const ProductCard = ({ product }: { product: Product }) => {
  const { cartItems, addItem, decreaseItem } = useCart();

  return (
    <div className="border border-gray-200 rounded-lg p-4 flex flex-col items-center text-center">
      <img
        src={thitbe}
        alt={product.name}
        className="object-contain mb-4 w-1/4"
      />
      <h4 className="text-gray-800 font-medium mb-2">{product.name}</h4>
      <p className="text-green-600 font-semibold text-lg mb-4">
        {product.price.toLocaleString("vi-VN")} ₫
      </p>
      {cartItems.some((item) => item.id === product.id) ? (
        <div className="flex items-center space-x-2 mb-4">
          <button
            className="p-2 rounded-md border border-gray-300"
            onClick={() => decreaseItem(product.id)}
          >
            -
          </button>
          <span className="text-gray-700">
            {cartItems.find((item) => item.id === product.id)?.quantity || 0}
          </span>
          <button
            className="p-2 rounded-md border border-gray-300"
            onClick={() => addItem(product)}
          >
            +
          </button>
        </div>
      ) : (
        <button
          className="p-2 rounded-md border border-green-500 hover:bg-gray-50 flex items-center justify-center space-x-2"
          onClick={() => {
            addItem(product);
          }}
        >
          <PiPlus />
          <span>Thêm vào giỏ hàng</span>
        </button>
      )}
    </div>
  );
};
