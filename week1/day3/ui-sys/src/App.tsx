import { useState, type ReactElement } from "react";
import "./App.css";
import Navigator from "./widgets/common/navigator";
import NavButton from "./widgets/common/nav_button";
import ReactList02 from "./samples/react_list02";
import StatePractice from "./samples/state_practice";
import Day5 from "./day5/day5";
import Day5Homework1 from "./day5/day5_homework1";
import Day5Homework2 from "./day5/day5_homework2";
import Day5Homework3 from "./day5/day5_homework3";
import ButtonPages from "./day4/button_page";
import SeachFieldPage from "./day4/seach_field_page";
import CardPage from "./day4/card_page";

const App = () => {
  const [page, setPage] = useState<number>(0);
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const pages: ReactElement[] = [
    ButtonPages(),
    SeachFieldPage(),
    CardPage(),
    ReactList02(),
    StatePractice(),
    Day5(),
    Day5Homework1(),
    Day5Homework2(),
    Day5Homework3(),
  ];

  const navData: string[] = [
    "day3-btns",
    "day3-search-fields",
    "day3-cards",
    "day4",
    "day4-2",
    "day5",
    "day5homework1",
    "day5homework2",
    "day5homework3",
    "day6",
    "day10",
    "day11",
    "day12",
    "day13",
    "day14",
    "day15",
    "day16",
    "day17",
    "day18",
    "day19",
    "day20",
  ];

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
      <div className="w-full h-screen grid grid-rows-[auto_1fr]">
        <Navigator
          onPageChange={handlePageChange}
          className={`bg-white shadow-md w-full p-5 overflow-x-auto ${
            isTop ? "relative" : "sticky z-10 top-0"
          } justify-start flex flex-row items-center gap-10`}
          items={navData.map((label, index) => (
            <NavButton
              label={label}
              selectedClass="border-green-400"
              className="px-4 py-2 border-b hover:border-green-400"
              idleClass="border-gray-300"
              selected={page === index}
              key={index}
            />
          ))}
        />
        <div className={"overflow-y-auto"}>{pages[page]}</div>
      </div>
    </>
  );
};

export default App;
