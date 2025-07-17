import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { PiTelevision } from "react-icons/pi";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthStore } from "./api/useAuthStore";
import { useNavigate } from "react-router";

interface LoginDay13Input {
  email: string;
  password: string;
  rememberMe: boolean;
}

const LoginDay13 = () => {
  const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
    rememberMe: yup.boolean().optional().default(false),
  });

  const { login } = useAuthStore();


  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginDay13Input>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginDay13Input> = async (data) => {
    await login({
      username: data.email,
      password: data.password,
      navigate,
    });
  };

  return (
    <div className="flex flex-row h-full">
      <div className="bg-blue-500 flex flex-col w-2/6 p-10 items-center justify-center gap-5">
        <div className="flex gap-4">
          <PiTelevision size={24} />
          <span className="text-white text-2xl font-semibold capitalize">
            Tasks Schedules system
          </span>
        </div>
        <span className="text-white text-3xl font-bold capitalize">
          a few clicks away
          <br /> from creating your <br /> Tasks Schedules workspace for your
          team
        </span>
        <DotLottieReact
          src="https://lottie.host/8caa8b73-1f33-4634-b591-09da049bc150/E4ibugqIzf.lottie"
          loop
          autoplay
        />
      </div>
      <div className="p-30 flex flex-col w-4/6 justify-center text-blue-900 items-start">
        <span className="text-2xl font-semibold capitalize mb-10">
          Login: auth only work on this sub page
        </span>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-5"
        >
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Email</label>
              <input
                type="text"
                {...register("email")}
                className="border border-gray-300 rounded p-2"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Password</label>
              <input
                type="text"
                {...register("password")}
                className="border border-gray-300 rounded p-2"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("rememberMe")}
              className="h-4 w-4"
            />
            <label className="text-sm capitalize">remember me</label>
            {errors.rememberMe && (
              <span className="text-red-500 text-sm">
                {errors.rememberMe.message}
              </span>
            )}
          </div>
          <div className="grid grid-cols-4 gap-5">
            <input
              type="submit"
              value="Login"
              className="bg-blue-500 col-span-1 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer transition-colors duration-200"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginDay13;
