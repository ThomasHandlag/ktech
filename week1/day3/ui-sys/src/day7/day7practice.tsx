import { NavLink, Outlet, useLocation, useNavigate } from "react-router";
import { day7Routes } from "../main";
import { BiCart } from "react-icons/bi";
import { useEffect } from "react";

export const baseUrl = "https://api.escuelajs.co/api/v1";

const Day7Practice = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === "/day7practice") {
      navigate("home", { replace: true });
    }
  }, [location.pathname, navigate]);
  return (
    <div className="flex flex-col">
      <nav className="flex flex-row items-center gap-4 p-4 bg-orange-500 shadow-md top-0 sticky z-10 justify-between">
        <span className="text-white font-semibold text-[50px] capitalize">
          magazines
        </span>
        <section className="flex flex-row items-center gap-2 capitalize">
          {day7Routes.map((item, index) => (
            <NavLink
              key={index}
              to={item.path!}
              className={({ isActive }) =>
                [isActive ? "text-black font-bold" : "text-white"] +
                " px-4 py-2 rounded-md shadow-md  text-nowrap hover:bg-white hover:text-orange-500 transition-colors duration-300"
              }
            >
              {item.path}
            </NavLink>
          ))}
          <button className="px-4 py-2 rounded-md bg-white text-orange-500 flex justify-between gap-2">
            <BiCart size={24} /> 0
          </button>
        </section>
      </nav>
      <span className="text-sm capitalize">
        {location.pathname.replaceAll("/", " > ").replace(">", "")}
      </span>
      <div className="flex flex-row gap-4 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Day7Practice;
