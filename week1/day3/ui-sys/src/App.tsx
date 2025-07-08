import { useState } from "react";
import "./App.css";
import { navData } from "./main";
import { NavLink, Outlet } from "react-router";

const App = () => {
  const [isTop, setIsTop] = useState<boolean>(true);

  window.onscroll = () => {
    if (window.scrollY > 50) {
      setIsTop(false);
    } else {
      setIsTop(true);
    }
  };

  return (
    <>
      <div className="w-full grid grid-rows-[auto_1fr] h-screen">
        <nav
          className={`bg-white shadow-md w-full p-2 overflow-x-auto ${
            isTop ? "relative" : "fixed z-10 top-0"
          } justify-start flex flex-row items-center gap-10`}
        >
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              [isActive ? "bg-indigo-500" : " "] +
              " px-4 py-2 rounded-md shadow-md capitalize text-nowrap"
            }
          >
            welcome
          </NavLink>
          {navData.map((item, index) => (
            <NavLink
              to={`/${item}`}
              key={index}
              className={({ isActive }) =>
                [isActive ? "bg-indigo-500" : ""] +
                " px-4 py-2 rounded-md shadow-md capitalize text-nowrap"
              }
            >
              {item}
            </NavLink>
          ))}
        </nav>
        <div className="w-full overflow-y-auto overflow-x-hidden">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default App;
