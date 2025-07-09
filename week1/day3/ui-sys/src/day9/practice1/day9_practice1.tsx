import { BiLeftArrowAlt } from "react-icons/bi";
import { Outlet, useLocation, useNavigate } from "react-router";
import bgimg from "./bgimg.png";

const Day9Practice1 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-screen items-center justify-center p-10">
      <span>To sign in, please use the default email; otherwise, use any email to sign up.</span>
      <div className="relative flex flex-col w-1/4 bg-gradient-to-b from-black to-green-600 h-[800px] rounded-3xl p-4 justify-between overflow-hidden">
        <div className="absolute inset-0 rounded-3xl overflow-hidden">
          <img
            src={bgimg}
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10">
          <button
            onClick={() => {
              if (location.pathname !== "/day8practice1") {
                navigate(-1);
              }
            }}
            className="flex items-start p-2 text-white text-2xl"
          >
            <BiLeftArrowAlt />
          </button>
        </div>

        <div className="relative z-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Day9Practice1;
