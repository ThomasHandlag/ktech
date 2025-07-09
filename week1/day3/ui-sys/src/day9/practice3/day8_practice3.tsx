import { yupResolver } from "@hookform/resolvers/yup/src/index.js";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as yup from "yup";

interface Day8Practice3Input {
  emailOrPhone: string;
  password: string;
  rememberMe: boolean;
}

const Day8Practice3 = () => {
  const schema = yup.object().shape({
    emailOrPhone: yup
      .string()
      .required("Email or phone number is required")
      .matches(
        /^[a-zA-Z0-9@.]+$/,
        "Email or phone number must be alphanumeric or contain @ and ."
      ),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-zA-Z]/, "Password must contain at least one letter")
      .matches(/^(?!.*\s).*/, "Password must not contain spaces")
      .required("Password is required"),
    rememberMe: yup.boolean().default(false),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Day8Practice3Input>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Day8Practice3Input> = (data) => {
    console.log("Remember user:", data.rememberMe);
  };

  return (
    <div className="flex items-center justify-center h-screen sm:p-2 p-10 bg-cyan-300/30">
      <div className="flex flex-row">
        <img
          src="https://nhannn87dn.github.io/ui-form-antd-yup/statics/img/grovia.png"
          alt=""
          className="object-fill w-4/6"
        />
        <div className="p-10 flex flex-col w-2/6 justify-center bg-white  items-start">
          <span className="text-2xl font-semibold capitalize mb-10 text-red-800">
            login
          </span>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-5"
          >
            <span className="capitalize text-xl font-bold">
              login to your account
            </span>
            <span className="text-sm text-gray-400">
              Thank you for get back to Grovia, let's access our the best
              recommendation contacts for you
            </span>
            <span className="h-[1px] w-full bg-gray-300"></span>
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Email or Phone</label>
              <input
                type="text"
                {...register("emailOrPhone")}
                className="border border-gray-300 rounded p-2"
              />
              {errors.emailOrPhone && (
                <span className="text-red-500 text-sm">
                  {errors.emailOrPhone.message}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold">Password</label>
              <input
                type="text"
                {...register("password")}
                className="border border-gray-300 rounded p-2 "
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register("rememberMe")}
                  className="h-4 w-4 accent-red-700"
                />
                <label className="text-sm">Remember me</label>
              </div>
              <span className="text-sm text-red-800 capitalize">
                reset password?
              </span>
            </div>

            <input
              type="submit"
              value="sign in"
              className="bg-red-700 uppercase col-span-1 text-white px-4 py-2 hover:bg-red-600 cursor-pointer transition-colors duration-200"
            />
            <span className="font-semibold">
              Don't have an account yet?
              <a href="#" className="text-red-800 ">
                Join Grovia now
              </a>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Day8Practice3;
