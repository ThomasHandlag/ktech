import { useState, type ReactElement } from "react";
import MButton from "../widgets/common/m_button";
import TextField from "../widgets/common/text_field";
import Switch from "../widgets/common/switch";
import { IoClose } from "react-icons/io5";
import SnackBar from "../widgets/common/snack_bar";
import SelectList from "../widgets/common/select_list";
import Checkbox from "../widgets/common/checkbox";
import SearchView from "../widgets/common/search_view";

const Day5 = (): ReactElement => {
  const [clickCount, setClickCount] = useState<number>(0);
  const [youTyped, setYouTyped] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [submitValue, setSubmitValue] = useState<string>("");
  const [selectValue, setSelectValue] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitValue(youTyped);
  };

  const incrementCount = () => {
    setClickCount((prevCount) => prevCount + 1);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): undefined => {
    setYouTyped(event.target.value);
  };

  const handleSwitchChange = (checked: boolean) => {
    setIsChecked(checked);
  };

  const [snackBars, addSnackBar] = useState<ReactElement[]>([]);

  const addSnackbar = () => {
    addSnackBar((prev) => [
      ...prev,
      <SnackBar
        key={prev.length}
        message="Double clicked!"
        duration={3000}
        className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg"
      />,
    ]);
  };

  const fruits = ["Apple", "Banana", "Cherry", "Date", "Elderberry"];

  return (
    <div className="p-10 justify-center items-center grid grid-rows-[auto_1fr] gap-5">
      <div className="flex flex-row items-center">
        <MButton
          onClick={incrementCount}
          children={"Click me!"}
          className="border border-indigo-400 px-4 py-2 rounded-md "
        />
        <span>You clicked that button {clickCount} times</span>
      </div>
      <div className="flex flex-col items-center ">
        <TextField onChange={handleInputChange} placeholder="Type here" />
        <span className="">
          You typed: {youTyped.length < 1 ? youTyped : "nothing"}
        </span>
      </div>
      <div className="flex flex-col items-center">
        <span className="">State: {isChecked ? "On" : "Off"}</span>
        <Switch
          checked={isChecked}
          onChange={handleSwitchChange}
          className="bg-white border border-indigo-500 w-24 h-12 rounded-3xl flex items-center shadow-inner shadow-gray-200"
        />
      </div>
      <span className="hover:bg-amber-500 bg-white ">Hover me!</span>
      <form
        className="flex flex-col items-center gap-2 justify-center p-5"
        onSubmit={handleSubmit}
      >
        <span className="">You submitted: {submitValue}</span>
        <TextField
          trailing={
            <button className="" onClick={() => setYouTyped("")}>
              <IoClose />
            </button>
          }
          leading={<span className="text-gray-500">Search:</span>}
          onChange={handleInputChange}
          value={youTyped}
          placeholder="Type here"
        />
        <button className="" type="submit">
          Submit
        </button>
      </form>
      <div className="flex flex-col items-center">
        <TextField
          onKeyDown={(event) => {
            setYouTyped(event.key);
          }}
          leading={<span className="text-gray-500">Search:</span>}
        />
        <span className="">Last key: {youTyped}</span>
      </div>
      <div className="">
        <MButton
          onDoubleClick={addSnackbar}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
          children={"Double tap to see magic!"}
        />
      </div>
      {snackBars.map((snackBar, index) => (
        <div key={index} className="w-full">
          {snackBar}
        </div>
      ))}

      <div className="flex flex-col items-center">
        <SelectList
          options={fruits}
          onChange={(e) => {
            setSelectValue(e.toString());
          }}
        />
        <span className="text-gray-500">Selected fruit: {selectValue}</span>
      </div>
      <div className="flex flex-col items-center">
        <Checkbox
          onChange={(e) => {
            setIsChecked(e.target.checked);
          }}
        />
        <span className="text-gray-500">
          Checkbox is: {isChecked ? "checked" : "unchecked"}
        </span>
      </div>
      <SearchView
        onSearchResult={(query) => {
          if (!query) return [];
          return fruits.filter((fruit) =>
            fruit.toLowerCase().trim().includes(query.toLowerCase())
          );
        }}
        placeholder="Search for a fruit..."
        className="w-full max-w-md"
        action="onType"
      />
    </div>
  );
};

export default Day5;
