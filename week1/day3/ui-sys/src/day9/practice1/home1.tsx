import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import PButton from "../../day4/p_button";
import { FaFacebook } from "react-icons/fa";
import { BsApple, BsGoogle } from "react-icons/bs";
import { useNavigate } from "react-router";

type Home1Input = {
  email: string;
};

const Home1 = () => {
  const schema = yup
    .object({
      email: yup.string().email("Invalid email").required("Email is required"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Home1Input>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "lisma@tech.com",
    },
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Home1Input> = (data) => {
    if (mockEmails.includes(data.email)) {
      navigate(`login/${data.email}`);
    } else {
      alert(`Email ${data.email} is not registered. Please sign up.`);
      navigate(`register/${data.email}`);
    }
  };

  const mockEmails = ["jaske@gmail.com", "lisma@tech.com"];

  return (
    <div className="flex flex-col items-center p-5 justify-between gap-5">
      <span className="flex text-white text-3xl font-semibold capitalize justify-start w-full">
        hi!
      </span>
      <div className="flex items-center justify-center w-full h-full flex-col ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 p-5 bg-gray-500/50 backdrop-blur-md rounded-xl "
        >
          <input
            className="bg-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300 transition-colors duration-200 cursor-pointer"
            {...register("email")}
            type="text"
            placeholder="Email"
          />
          {errors.email && (
            <span className="text-red-400 capitalize">
              {errors.email.message}
            </span>
          )}
          <input
            type="submit"
            value={"Continue"}
            className="bg-teal-400 text-white px-4 py-2 rounded-lg hover:cursor-pointer"
          />
          <span className="text-sm flex items-center justify-center text-white">
            or
          </span>
          <PButton
            className="bg-green-50 rounded-xl"
            leading={
              <span className="text-blue-500">
                <FaFacebook />
              </span>
            }
            children={<span className="">Continue with Facebook</span>}
          />
          <PButton
            className="bg-green-50 rounded-xl"
            leading={
              <span className="">
                <BsGoogle />
              </span>
            }
            children={<span className="">Continue with Google</span>}
          />
          <PButton
            className="bg-green-50 rounded-xl"
            leading={
              <span className="">
                <BsApple />
              </span>
            }
            children={<span className="">Continue with Apple</span>}
          />
          <span className="flex ">
            <span className="text-white">Don't have account?</span>
            <button
              onClick={() => navigate("register")}
              className="text-teal-500 cursor-pointer ml-1 hover:underline"
            >
              Sign Up
            </button>
          </span>
          <span className="text-teal-500 capitalize">
            forgot your password?
          </span>
        </form>
      </div>
    </div>
  );
};

export default Home1;
