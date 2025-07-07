import { IoIosMore, IoMdNotificationsOutline } from "react-icons/io";
import Card from "../widgets/common/card";
import Avatar from "../widgets/common/avatar";
import person1 from "../assets/images/samples/person1.png";
import avatar1 from "../assets/images/samples/avatar1.png";
import girl from "../assets/images/samples/girl.png";
import nice from "../assets/images/samples/nice.png";
import view from "../assets/images/samples/view.png";
import view2 from "../assets/images/samples/view2.png";
import sunbehindcloud from "../assets/images/samples/sun-behind-cloud.png";
import { RiVisaLine } from "react-icons/ri";
import { MdVisibilityOff } from "react-icons/md";
import ProgressIndicator from "../widgets/common/progress_indicator";
import { TiCameraOutline } from "react-icons/ti";
import { FaPhone, FaPlay } from "react-icons/fa";

const CardPage = () => {
  return (
    <div className="flex flex-col p-5 items-center justify-center gap-5">
      <Card
        className="p-3"
        header={
          <div className="flex flex-row justify-between items-center p-2">
            <span className="text-red-600">7'</span>
            <IoIosMore />
          </div>
        }
        content={
          <div className="flex flex-row justify-between items-center p-2">
            <div className="flex flex-row gap-1">
              <span className="text-sm text-gray-700 capitalize">spain</span>
              <Avatar url="https://th.bing.com/th/id/ODL.487332aa718f46942644019a75f318bc?w=143&h=95&c=10&rs=1&o=6&cb=ircwebpc1&dpr=1.4&pid=AlgoBlockDebug" />
            </div>
            <span className="rounded-xl bg-gray-200 px-4 py-2 font-bold">
              0 - 0
            </span>
            <div className="flex flex-row gap-1">
              <span className="text-xs text-gray-700 capitalize">france</span>
              <Avatar url="https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/250px-Flag_of_France.svg.png" />
            </div>
          </div>
        }
      />
      <Card
        className="p-3"
        header={
          <div className="flex flex-row justify-between items-center p-2">
            <div className="flex flex-row justify-between items-center gap-2 ">
              <Avatar
                size={40}
                url="https://th.bing.com/th?q=Manchester+United+Red+Devil+Logo&w=120&h=120&c=1&rs=1&qlt=70&o=7&cb=1&dpr=1.4&pid=InlineBlock&rm=3&mkt=en-WW&cc=VN&setlang=en&adlt=moderate&t=1&mw=247"
              />
              <span className="font-bold">Manchester United</span>
            </div>
            <IoIosMore />
          </div>
        }
      />
      <Card
        className="p-3"
        header={
          <div className="flex flex-row justify-start gap-2 items-center p-2">
            <Avatar size={60} url={person1} />
            <div className="flex flex-col items-start justify-center p-2">
              <span className="font-bold capitalize">wade warren</span>
              <div className="flex flex-row items-center justify-start gap-2">
                <RiVisaLine color="#0000ff" size={30} />
                <span className="text-sm text-gray-700">34834824</span>
                <span className="text-sm text-gray-700">••••</span>
                <div className="ml-4">
                  <MdVisibilityOff />
                </div>
              </div>
            </div>
          </div>
        }
      />
      <Card
        className="p-3"
        header={
          <div className="flex flex-row justify-between gap-2 items-center p-2">
            <div className="flex flex-row gap-1 capitalize text-[12px]">
              <span className="bg-green-200 rounded-lg px-2 py-1">
                hightlight
              </span>
              <span className="bg-pink-200 rounded-lg px-2 py-1">feeds</span>
            </div>
            <IoIosMore />
          </div>
        }
        content={
          <div className="flex flex-col items-start justify-center p-2">
            <span className="font-bold capitalize">dashboard</span>
            <span className="text-[12px] text-gray-400">
              Bussiness management services
            </span>
            <ProgressIndicator
              value="100px"
              trailing={
                <span className="text-xs text-gray-500 font-bold">50%</span>
              }
              indicatorColor="#41FAA1"
              height="4px"
              width="200px"
              className="rounded-lg"
            />
          </div>
        }
      />

      <Card
        className="p-3"
        header={
          <div className="flex flex-row justify-between gap-2 items-center p-2">
            <div className="flex flex-row gap-2">
              <Avatar size={60} url={avatar1} />
              <div className="flex flex-col items-start justify-center p-2 capitalize">
                <span className="font-bold ">yolanda</span>
                <span className="text-[12px] text-gray-400">
                  web development
                </span>
              </div>
            </div>
            <TiCameraOutline size={30} color="#777777" />
          </div>
        }
      />
      <Card
        header={
          <div className="flex flex-row gap-2 items-center">
            <img src={girl} alt="" className="object-fill rounded-l-xl" />
            <div className="flex flex-row gap-10 justify-between items-center p-2">
              <span className="font-bold text-[30px] capitalize">maría</span>
              <span>
                <FaPhone size={20} />
              </span>
            </div>
          </div>
        }
        className=""
      />
      <Card
        header={
          <div className="flex flex-row gap-10 items-center">
            <Avatar url={avatar1} size={50} />
            <span className="font-bold capitalize">Miriam Jimenez</span>
          </div>
        }
        className="p-5 bg-cyan-300"
        rounded="rounded-[50px]"
      />
      <Card
        header={
          <div className="flex flex-row gap-4 items-center justify-evenly">
            <div className="flex flex-row">
              <Avatar url={avatar1} size={50} className="" />
              <Avatar url={avatar1} size={50} className=" -ml-5" />
              <Avatar url={avatar1} size={50} className=" -ml-5" />
            </div>
            <div className="flex flex-col items-start justify-center p-2 capitalize text-white">
              <span className="font-bold text-[20px] capitalize">Teams</span>
              <span className="text-[12px] ">Two currently</span>
            </div>
          </div>
        }
        className="p-5 bg-indigo-600"
        rounded="rounded-[50px]"
      />
      <Card
        header={
          <div className="flex flex-row gap-4 items-center justify-evenly">
            <div className="flex flex-row">
              <Avatar url={avatar1} size={50} className="" />
              <Avatar url={avatar1} size={50} className=" -ml-2" />
            </div>
            <span className="font-bold text-[20px] capitalize">new Teams</span>
          </div>
        }
        className="p-5 bg-yellow-400"
        rounded="rounded-[50px]"
      />
      <Card
        className="p-4"
        header={
          <div className="flex flex-row gap-2 items-center  justify-between">
            <Avatar url={nice} size={50} className="" />
            <div className="flex flex-col flex-grow items-start justify-center p-2">
              <span className="font-bold text-[20px] capitalize">
                nike store
              </span>
              <span className="font-bold text-[10px] text-gray-400 capitalize">
                6 months of promotions
              </span>
            </div>
            <div className="flex flex-col flex-grow items-center justify-between">
              <span className="font-bold text-[15px] capitalize">-27.50</span>
              <span className="text-[9px] text-gray-500 uppercase">
                11:00 am
              </span>
            </div>
          </div>
        }
      />
      <Card
        className="p-4"
        header={
          <div className="flex flex-row gap-2 items-center justify-between">
            <span className="font-bold text-[12px] text-left">
              All your notifications are well turned on
            </span>
            <span className="before:content-['|'] text-gray-500"></span>
            <IoMdNotificationsOutline />
            <div className="px-4 bg-black text-white rounded-xl">3</div>
          </div>
        }
      />

      <Card
        className="p-4 bg-yellow-100"
        header={
          <div className="flex flex-row gap-6 items-center">
            <Avatar url={view} size={50} />
            <div className="flex flex-col items-start justify-center capitalize font-semibold p-2">
              <span className="">landescape</span>
              <span className="">423km</span>
            </div>
            <IoIosMore className="flex-grow" />
          </div>
        }
      />
      <Card
        className="p-4"
        header={
          <div className="flex flex-row gap-6 items-center ">
            <Avatar url={view2} size={50} />
            <div className="flex flex-col items-start justify-center capitalize font-semibold p-2">
              <span className="text-gray-400">falset mountains</span>
              <span className="">423km, 3 week</span>
            </div>
            <img src={sunbehindcloud} width={20} height={20} alt="" />
          </div>
        }
      />
      <Card
        className="p-4 bg-cyan-100"
        header={
          <div className="flex flex-row items-center  justify-between">
            <img src={sunbehindcloud} width={30} height={30} alt="" />
            <div className="flex flex-col items-start justify-center font-semibold p-2">
              <span className="text-[15px]">Great day to schedules</span>
              <span className="text-gray-400 text-[12px]">
                Something is happening
              </span>
            </div>
            <div className="bg-indigo-600 rounded-full p-2">
              <FaPlay size={12} color="#fff" />
            </div>
          </div>
        }
      />
      <Card
        className="p-4 "
        header={
          <div className="flex flex-row items-center justify-between">
            <WeatherBox day="Mon" />
            <WeatherBox day="Tue" />
            <WeatherBox day="Wed" today />
            <WeatherBox day="Thu" />
            <WeatherBox day="Fri" />
            <WeatherBox day="Sar" />
          </div>
        }
      />
      <Card
        className="p-4 bg-gradient-to-r from-orange-500  via-red-500 to-pink-600 text-white"
        header={
          <div className="flex flex-row items-center  justify-between">
            <div className="flex flex-col items-start justify-center font-semibold p-2">
              <span className="text-[15px] font-bold">Seatle</span>
              <span className="text-[10px]">Cloudy</span>
            </div>
            <div className="text-[30px] font-bold">32°</div>
            <img src={sunbehindcloud} width={30} height={30} alt="" />
          </div>
        }
      />
      <Card
        className="p-4"
        header={
          <div className="flex flex-row items-start justify-between font-semibold p-2">
            <div className="flex flex-col items-start justify-center">
              <span className="text-[15px]">Great day to schedules</span>
              <span className="text-gray-400 text-[10px]">
                Your usual hours
              </span>
            </div>
            <IoIosMore />
          </div>
        }
        content={
          <div className="flex flex-row items-center justify-between">
            <WeatherBox day="Mon" hour="2:00pm" />
            <WeatherBox day="Tue" hour="3:00pm" />
            <WeatherBox day="Wed" hour="4:00pm" today />
            <WeatherBox day="Thu" hour="5:00pm" />
            <WeatherBox day="Fri" hour="6:00pm" />
            <WeatherBox day="Sar" hour="7:00pm" />
          </div>
        }
      />
      <Card
        className="p-4"
        header={
          <div className="flex flex-row items-center justify-between font-semibold p-2">
            <div className="flex flex-col items-start justify-center">
              <span className="text-[15px]">Jun</span>
              <span className="text-fuchsia-500 text-lg font-semibold">24</span>
            </div>
            <span className="before:content-['|'] text-[40px] font-thin text-gray-300"></span>
            <div className="flex flex-col items-start justify-center">
              <span className="text-[15px]">Wednesday</span>
              <span className="text-gray-300 text-xs">08:00 AM - 18:00 PM</span>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default CardPage;

type WeatherBoxProps = {
  day?: string;
  icon?: string;
  hour?: string;
  today?: boolean;
};

export const WeatherBox = ({
  day = "Mon",
  icon = sunbehindcloud,
  hour,
  today = false,
}: WeatherBoxProps) => {
  return (
    <div
      className={
        "flex flex-col items-center justify-center font-semibold p-2 " +
        (today ? "bg-blue-100 rounded-lg" : "")
      }
    >
      <img src={icon} width={12} height={12} alt="" />
      <span className="text-[10px] capitalize">{day}</span>
      <span className="text-[8px] text-gray-500 uppercase">{hour}</span>
    </div>
  );
};
