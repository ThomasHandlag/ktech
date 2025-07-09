import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";

interface RegisterDay8Input {
  email: string;
  password: string;
}

const RegisterDay9 = () => {
  const schema = yup
    .object({
      email: yup.string().email("Invalid email").required("Email is required"),
      password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    })
    .required();

  const params = useParams();
  const email = params.email;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterDay8Input>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: email,
      password: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<RegisterDay8Input> = (data) => {
    navigate(`login/${data.email}`);
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col items-center p-5 justify-between gap-5">
      <span className="flex text-white text-3xl font-semibold capitalize justify-start w-full">
        sign up
      </span>
      <div className="flex items-center justify-center h-full flex-col ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 p-5 bg-gray-500/50 backdrop-blur-md rounded-xl "
        >
          {email && (
            <div className="text-xs flex flex-col text-gray-300">
              <span className=" capitalize">
                look like you don't have an account
              </span>
              <span className="capitalize">let's create a new account for</span>
              <span>{email}</span>
            </div>
          )}
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

          <span className="text-xs capitalize inline text-gray-300">
            by selecting Agree and Continue below, <br /> I agree to
            <span className="text-teal-500">
              Terms of Service and Privacy Policy
            </span>
          </span>
          <input
            type="submit"
            value={"Continue"}
            className="bg-teal-400 text-white px-4 py-2 rounded-lg hover:cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
};

export default RegisterDay9;
