import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, type SubmitHandler } from "react-hook-form";

interface Day9HomeworkInput {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  gender: string;
  birthDate: string;
  country: string;
  hobbies: string[];
  picture: File | null;
  bio: string;
}

const validateSchema = yup
  .object({
    fullName: yup
      .string()
      .min(3, "Full name must be at least 3 characters")
      .required("Full name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[@$!%*?&]/,
        "Password must contain at least one special character"
      )
      .matches(
        /^(?=.*[A-Z])/,
        "Password must contain at least one uppercase letter"
      )
      .matches(
        /^(?=.*[a-z])/,
        "Password must contain at least one lowercase letter"
      )
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
    phoneNumber: yup
      .string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    gender: yup
      .string()
      .oneOf(["male", "female", "other"], "Gender is required"),
    birthDate: yup
      .string()
      .required("Birth date is required")
      .test("age", "You must be at least 18 years old", (value) => {
        if (!value) return false;
        const birth = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
          return age - 1 >= 18;
        }
        return age >= 18;
      })
      .test("maxAge", "You must be smaller than 100 years old", (value) => {
        if (!value) return false;
        const birth = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
          return age - 1 < 100;
        }
        return age < 100;
      }),
    country: yup.string().required("Country is required"),
    hobbies: yup
      .array()
      .of(yup.string())
      .default([])
      //hobbies must be a `array` type, but the final value was: `false`. how to fix this?
      .test("minLength", "Please select at least one hobby", (value) => {
        return Array.isArray(value) && value.length > 0;
      })
      .required("Hobbies are required"),
    picture: yup
      .mixed()
      .optional()
      .test("fileType", "Unsupported File Format", (value) => {
        if (!value || !value[0]) return true;
        const file = value[0];
        const supportedFormats = ["image/jpeg", "image/png", "image/gif"];
        return supportedFormats.includes(file.type);
      }),
    bio: yup.string().optional().max(300, "Bio must be at most 300 characters").default(""),
  })
  .required();

const HomeworkDay9 = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Day9HomeworkInput>({
    defaultValues: {
      gender: "male",
      hobbies: [] as string[],
    },
    resolver: yupResolver(validateSchema),
  });

  const textFieldClass =
    "shadow rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500";

  const onSubmit: SubmitHandler<Day9HomeworkInput> = (data) => {
    console.log("Form Data Submitted:", data);
  };

  return (
    <div className="flex items-center justify-center p-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full max-w-md"
      >
        <div className="flex flex-col">
          Full name
          <input
            type="text"
            {...register("fullName")}
            className={textFieldClass}
          />
          {errors.fullName && (
            <p className="mt-2 text-sm text-red-600">
              {errors.fullName.message}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          Email
          <input {...register("email")} className={textFieldClass} />
          {errors.email && (
            <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col">
          Password
          <input
            type="password"
            {...register("password")}
            className={textFieldClass}
          />
          {errors.password && (
            <p className="mt-2 text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          Confirm Password
          <input
            type="password"
            {...register("confirmPassword")}
            className={textFieldClass}
          />
          {errors.confirmPassword && (
            <p className="mt-2 text-sm text-red-600">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          Phone Number
          <input {...register("phoneNumber")} className={textFieldClass} />
          {errors.phoneNumber && (
            <p className="mt-2 text-sm text-red-600">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          Gender
          <div className="flex items-center">
            <input
              type="radio"
              {...register("gender")}
              value="male"
              className="mr-2"
            />
            <label>Male</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              {...register("gender")}
              value="female"
              className="mr-2"
            />
            <label>Female</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              {...register("gender")}
              value="other"
              className="mr-2"
            />
            <label>Other</label>
          </div>
          {errors.gender && (
            <p className="mt-2 text-sm text-red-600">{errors.gender.message}</p>
          )}
        </div>
        <div className="flex flex-col">
          Birth Date
          <input
            type="date"
            {...register("birthDate")}
            className={textFieldClass}
          />
          {errors.birthDate && (
            <p className="mt-2 text-sm text-red-600">
              {errors.birthDate.message}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          Country
          <select {...register("country")} className={textFieldClass}>
            <option value="">Select a country</option>
            <option value="USA">United States</option>
            <option value="Canada">Canada</option>
            <option value="UK">United Kingdom</option>
          </select>
          {errors.country && (
            <p className="mt-2 text-sm text-red-600">
              {errors.country.message}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          Hobbies
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register("hobbies")}
              value="reading"
              className="mr-2"
            />
            <label>Reading</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register("hobbies")}
              value="traveling"
              className="mr-2"
            />
            <label>Traveling</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register("hobbies")}
              value="gaming"
              className="mr-2"
            />
            <label>Gaming</label>
          </div>
          {errors.hobbies && (
            <p className="mt-2 text-sm text-red-600">
              {errors.hobbies.message}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          Profile Picture
          <input
            type="file"
            {...register("picture")}
            className={textFieldClass}
          />
          {errors.picture && (
            <p className="mt-2 text-sm text-red-600">
              {errors.picture.message}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          Bio
          <textarea
            {...register("bio")}
            className={textFieldClass}
            placeholder="Tell us about yourself"
          />
          {errors.bio && (
            <p className="mt-2 text-sm text-red-600">{errors.bio.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="mt-4 w-full rounded-md bg-blue-500 py-2 text-white shadow hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default HomeworkDay9;
