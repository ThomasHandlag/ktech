import { FaExchangeAlt, FaPhone, FaSearch } from "react-icons/fa";

import { IoFilterCircleOutline } from "react-icons/io5";
import TextField from "../widgets/common/text_field";

const SeachFieldPage = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-5 p-10">
      <TextField
        leading={<FaSearch />}
        onChange={() => {}}
        placeholder="Search"
      />
      <TextField leading={<FaSearch />} onChange={() => {}} />
      <TextField leading={<FaSearch />} onChange={() => {}} value="Textfield" />
      <TextField
        leading={<FaSearch />}
        onChange={() => {}}
        placeholder="Search in the web"
        trailing={<IoFilterCircleOutline className="" />}
      />
      <TextField
        leading={<FaSearch />}
        onChange={() => {}}
        placeholder="Search crypto"
        trailing={<FaExchangeAlt className="" />}
      />
      <TextField
        onChange={() => {}}
        placeholder="Phone number"
        trailing={
          <span className="p-2 bg-green-300 rounded-md text-[12px]">
            <FaPhone />
          </span>
        }
      />
      <TextField
        leading={<FaSearch />}
        onChange={() => {}}
        placeholder="Search in the web"
        trailing={
          <span className="p-2 bg-yellow-300 rounded-full">
            <IoFilterCircleOutline />
          </span>
        }
      />
    </div>
  );
};

export default SeachFieldPage;
