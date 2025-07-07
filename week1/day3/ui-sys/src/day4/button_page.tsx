import {
  FaApple,
  FaFacebook,
  FaGoogle,
  FaLongArrowAltRight,
} from "react-icons/fa";
import PButton from "./p_button";

const ButtonPages = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 w-[400px] h-[600px] bg-indigo-100 rounded-xl shadow-md">
      <PButton
        leading={<span className="capitalize">get started</span>}
        className={" bg-black rounded-xl text-white justify-between"}
        trailing={<FaLongArrowAltRight />}
      />
      <PButton
        leading={<FaApple />}
        className={" bg-black rounded-xl text-white justify-between"}
        children={<span className="capitalize">Continue with apple</span>}
        trailing={<span></span>}
      />
      <PButton
        leading={<FaFacebook />}
        className={
          "bg-white rounded-xl border-2 border-black text-black justify-between"
        }
        children={<span className="capitalize">Continue with facebook</span>}
        onClick={() => {}}
        trailing={<span></span>}
      />
      <PButton
        leading={<FaGoogle />}
        className={"bg-white rounded-xl border-2 border-black justify-between"}
        children={<span className="capitalize">Continue with google</span>}
        onClick={() => {}}
        trailing={<span></span>}
      />
      <PButton
        className={"bg-white rounded-xl border-2 border-black justify-between"}
        leading={<FaGoogle />}
        onClick={() => {}}
        trailing={<span></span>}
      >
        <span className="capitalize">Continue with email</span>
      </PButton>
    </div>
  );
};

export default ButtonPages;
