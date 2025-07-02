import React, { useState } from "react";
import "./App.css";
import PhoneLayout from "./layouts/phone_layout";
import ButtonPages from "./components/button_page";
import SeachFieldPage from "./components/seach_field_page";
import CardPage from "./components/card_page";

const App = () => {
  const [page, setPage] = useState<number>(0);

  const pages: React.ReactElement[] = [
    ButtonPages(),
    SeachFieldPage(),
    CardPage(),
  ];

  return (
    <div className="flex flex-col w-full h-full bg-gray-100 justify-center items-center">
      <PhoneLayout child={pages[page]} />
      <div className="flex justify-center items-center h-16 bg-blue-500 text-white">
        <button
          className="px-4 py-2 rounded-md bg-blue-700 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={() => setPage((prev) => (prev + 1) % pages.length)}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default App;
