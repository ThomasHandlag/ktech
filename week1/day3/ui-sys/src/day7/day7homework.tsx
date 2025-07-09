import { PiPlus } from "react-icons/pi";
import MButton from "../widgets/common/m_button";
import { NavLink, Outlet } from "react-router";
import { day7homeworkRoutes } from "../main";
import TextField from "../widgets/common/text_field";
import { FaSearch } from "react-icons/fa";
import Avatar from "../widgets/common/avatar";
import person1 from "../assets/images/samples/person1.png";
import { IoNotifications } from "react-icons/io5";

const Day7Homework = () => {
  return (
    <div className="flex flex-row h-full">
      <div className="flex flex-col items-start p-4 border border-gray-200 w-1/4 justify-evenly">
        <div className="flex ml-6 items-center p-2 capitalize gap-2 text-xl font-bold">
          <span className="p-2 bg-indigo-500 text-white rounded">
            <PiPlus size={24} />
          </span>
          h-care
        </div>
        <MButton
          className="flex ml-6 items-center flex-row px-6 py-2 gap-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
          children={
            <div>
              register patient <PiPlus size={20} />
            </div>
          }
        />
        <div className="flex flex-col gap-2">
          {day7homeworkRoutes.map((route) => (
            <NavLink
              to={route.path ?? ""}
              key={route.path}
              className={({ isActive }) =>
                `capitalize flex ml-6 items-center px-6 py-2 gap-2 rounded hover:bg-indigo-100 ${
                  isActive ? "bg-indigo-200" : ""
                }`
              }
            >
              {route.path}
            </NavLink>
          ))}
        </div>
      </div>
      <div className="flex flex-col w-3/4">
        <div className="flex flex-row justify-between p-5 border-b border-gray-200 items-center">
          <TextField
            placeholder="Search..."
            leading={
              <span className="text-gray-400">
                <FaSearch size={20} />
              </span>
            }
            className="rounded-3xl shadow-md w-1/2"
          />
          <div className="flex gap-6 items-center">
            <IoNotifications size={24} />
            <Avatar
              size={40}
              url={person1}
              className="rounded-full object-cover h-[40px] w-[40px]"
            />
            <span className="text-gray-700 font-semibold">Dr. John Doe</span>
          </div>
        </div>
        <div className="flex flex-col items-start p-5 text-3xl font-bold">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Day7Homework;
