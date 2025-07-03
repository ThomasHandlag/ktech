import { useState, type ReactElement } from "react";
import "./App.css";
import Navigator from "./widgets/common/navigator";
import NavButton from "./widgets/common/nav_button";
import ReactList01 from "./samples/react_list01";
import ReactList02 from "./samples/react_list02";
import StatePractice from "./samples/state_practice";

const App = () => {
  const [page, setPage] = useState<number>(0);
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const pages: ReactElement[] = [ReactList02(), ReactList01(), StatePractice()];

  const navData: string[] = ["Home", "About", "Services", "Contact"];

  return (
    <>
      <div className="w-screen h-screen flex flex-col">
        <Navigator
          onPageChange={handlePageChange}
          className="bg-black w-full h-[100px] sticky justify-center z-10 flex flex-row items-center gap-10"
          items={navData.map((label, index) => (
            <NavButton
              label={label}
              selectedClass="bg-indigo-500"
              className="px-4 py-2 rounded-md hover:bg-indigo-200"
              idleClass="bg-white"
              selected={page === index}
              key={index}
            />
          ))}
        />
        <div className="p-10 flex flex-col flex-grow w-full items-center justify-center">
          {pages[page]}
        </div>
        <div className="p-10 flex h-[200px] w-full bg-black"></div>
      </div>
    </>
  );
};

export default App;
