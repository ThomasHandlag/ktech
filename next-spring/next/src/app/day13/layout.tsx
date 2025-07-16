import {
  ArrowRight,
  LocationEditIcon,
  PersonStandingIcon,
  SearchIcon,
  ShoppingCart,
} from "lucide-react";

import Image from "next/image";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="bg-yellow-200 flex items-center justify-center gap-2 p-4">
        <Image
          src="https://cdnv2.tgdd.vn/mwg-static/tgdd/Banner/e4/d2/e4d215b404d123b25e8b8f5c01ac2f56.png"
          alt="Banner Image"
          width={1000}
          height={200}
          className="object-cover"
        />
      </div>
      <div className="bg-yellow-300 flex flex-col items-center justify-center p-4">
        <div className="flex gap-4 items-center justify-between w-full max-w-4xl p-4">
          <div className="flex items-center justify-center gap-2 px-4 py-2 bg-white rounded-3xl shadow-md">
            <SearchIcon size={20} className="text-gray-300" />
            <input
              placeholder="Bạn tìm gì..."
              type="text"
              className="focus:outline-none border-0"
            />
          </div>
          <div className="flex gap-2 items-center">
            <PersonStandingIcon />
            <span>Đăng nhập</span>
          </div>
          <div className="flex gap-2 items-center">
            <span>Giỏ hàng</span>
            <ShoppingCart />
          </div>
          <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-3xl shadow-md">
            <LocationEditIcon />
            <input
              type="text"
              className="focus:outline-none border-0"
              placeholder="Hồ Chí Minh"
            />
            <ArrowRight size={20} />
          </div>
        </div>
      </div>
      <div className="w-full p-4">{children}</div>
    </div>
  );
};

export default Layout;
