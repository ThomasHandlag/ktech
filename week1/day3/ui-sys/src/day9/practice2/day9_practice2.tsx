import { yupResolver } from "@hookform/resolvers/yup/src/index.js";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { PiTelevision } from "react-icons/pi";
import * as yup from "yup";

interface Day8Practice2Input {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  agreeToTerms: boolean;
  receiveUpdates: boolean;
}

const Day9Practice2 = () => {
  const schema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
    firstName: yup
      .string()
      .required("First name is required")
      .min(2, "First name must be at least 2 characters"),
    lastName: yup
      .string()
      .required("Last name is required")
      .min(2, "Last name must be at least 2 characters"),
    phoneNumber: yup
      .string()
      .matches(/^\d$/, "Phone number must be digits")
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number must be at most 15 digits")
      .required("Phone number is required"),
    agreeToTerms: yup
      .boolean()
      .oneOf([true], "You must agree to the terms and conditions")
      .required(),
    receiveUpdates: yup.boolean().default(false),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Day8Practice2Input>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Day8Practice2Input> = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="flex flex-row h-full">
      <div className="bg-blue-500 flex flex-col w-2/6 p-10 items-center justify-center gap-5">
        <div className="flex gap-4">
          <PiTelevision size={24} />
          <span className="text-white text-2xl font-semibold capitalize">
            lottery display
          </span>
        </div>
        <span className="text-white text-3xl font-bold capitalize">
          a few clicks away
          <br /> from creating your <br /> Lottery Display
        </span>
        <DotLottieReact
          src="https://lottie.host/8caa8b73-1f33-4634-b591-09da049bc150/E4ibugqIzf.lottie"
          loop
          autoplay
        />
      </div>
      <div className="p-30 flex flex-col w-4/6 justify-center text-blue-900 items-start">
        <span className="text-2xl font-semibold capitalize mb-10">
          register
        </span>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-5"
        >
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col">
              <label className="text-sm font-semibold">First Name</label>
              <input
                type="text"
                {...register("firstName")}
                className="border border-gray-300 rounded p-2"
              />
              {errors.firstName && (
                <span className="text-red-500 text-sm">
                  {errors.firstName.message}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Last Name</label>
              <input
                type="text"
                {...register("lastName")}
                className="border border-gray-300 rounded p-2"
              />
              {errors.lastName && (
                <span className="text-red-500 text-sm">
                  {errors.lastName.message}
                </span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Phone Number</label>
              <input
                type="text"
                {...register("phoneNumber")}
                className="border border-gray-300 rounded p-2"
              />
              {errors.phoneNumber && (
                <span className="text-red-500 text-sm">
                  {errors.phoneNumber.message}
                </span>
              )}
            </div>
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
            <div className="flex flex-col">
              <label className="text-sm font-semibold">Confirm Password</label>
              <input
                type="text"
                {...register("confirmPassword")}
                className="border border-gray-300 rounded p-2"
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("receiveUpdates")}
              className="h-4 w-4"
            />
            <label className="text-sm">
              Yes, I want to receive Lottery Display emails
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("agreeToTerms")}
              className="h-4 w-4"
            />
            <label className="text-sm">
              I agree to the{" "}
              <span className="text-blue-500 font-semibold">
                Terms, Privacy Policy{" "}
              </span>{" "}
              and <span className="text-blue-500 font-semibold">Fees</span>
            </label>
            {errors.agreeToTerms && (
              <span className="text-red-500 text-sm">
                {errors.agreeToTerms.message}
              </span>
            )}
          </div>
          <div className="grid grid-cols-4 gap-5">
            <input
              type="submit"
              value="Create Account"
              className="bg-blue-500 col-span-1 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer transition-colors duration-200"
            />
          </div>
          <span className="font-semibold">
            Already have an account?
            <a href="#" className="text-blue-500 ">
              Sign in
            </a>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Day9Practice2;
