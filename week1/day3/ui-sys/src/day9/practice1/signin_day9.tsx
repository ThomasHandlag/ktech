import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useParams } from "react-router";
import * as yup from "yup"
import person1 from "../../assets/images/samples/person1.png";
import Avatar from "../../widgets/common/avatar";

interface SignIn9Input {
  password: string;
}

const SignInDay9 = () => {
  const params = useParams();
  const email = params.email;
  const [showPassword, setShowPassword] = useState(false);

  const schema = yup
    .object({
      password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignIn9Input>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<SignIn9Input> = (data) => {
    alert(`You login with password: ${data.password} and email: ${email}`);
  };
  return (
    <div className="flex flex-col items-center p-5 justify-between gap-5">
      <span className="flex text-white text-3xl font-semibold capitalize justify-start w-full">
        login
      </span>
      <div className="flex items-center justify-center h-full flex-col w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 p-5 bg-gray-500/50 backdrop-blur-md rounded-xl "
        >
          <div className="flex">
            <Avatar
              url={person1}
              size={30}
              className="rounded-full shadow-none"
            />
            <span className="text-gray-300 ml-4 flex flex-col">
              <span className="text-sm font-semibold capitalize">jane doe</span>
              <span className="text-sm ">{email}</span>
            </span>
          </div>
          <div className="relative">
            <input
              className="bg-white px-4 py-2 pr-16 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300 transition-colors duration-200 cursor-pointer w-full"
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 text-sm font-medium"
            >
              {showPassword ? "Hide" : "View"}
            </button>
          </div>
          {errors.password && (
            <span className="text-red-400 capitalize">
              {errors.password.message}
            </span>
          )}
          <input
            type="submit"
            value={"Continue"}
            className="bg-teal-400 text-white px-4 py-2 rounded-lg hover:cursor-pointer"
          />
          <span className="text-teal-500 capitalize text-sm">
            forgot your password?
          </span>
        </form>
      </div>
    </div>
  );
};

export default SignInDay9;
