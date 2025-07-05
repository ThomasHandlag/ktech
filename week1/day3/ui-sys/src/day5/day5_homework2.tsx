import DatePicker from "../widgets/common/date_picker";
import SelectList from "../widgets/common/select_list";
import FormField from "../widgets/common/form_field";
import TextFormField from "../widgets/common/text_form_field";
import RadioGroup from "../widgets/common/radio_group";
import TextArea from "../widgets/common/text_area";
import InputFileField from "../widgets/common/input_file";
import MButton from "../widgets/common/m_button";
import { useState, type ChangeEvent } from "react";
import Checkbox from "../widgets/common/checkbox";

const validatePhoneNumber = (value: string): string | null => {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(value) ? null : "Invalid phone number format";
};

const validateEmail = (value: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value) ? null : "Invalid email format";
};

const validatePassword = (value: string): string | null => {
  if (value.length < 8) {
    return "Password must be at least 9 characters long.";
  }

  if (!/[A-Z]/.test(value)) {
    return "Password must contain at least one uppercase letter.";
  }

  if (!/[a-z]/.test(value)) {
    return "Password must contain at least one lowercase letter.";
  }

  if (!/[0-9]/.test(value)) {
    return "Password must contain at least one number.";
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
    return "Password must contain at least one special character.";
  }
  return null;
};

const confirmPasswordValidation = (
  value: string,
  password: string
): string | null => {
  return value === password ? null : "Passwords do not match.";
};

const ageValidation = (value: string): string | null => {
  const today = new Date();
  const birthDate = new Date(value);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  if (age > 100) {
    return "Invalid date";
  }

  return age >= 18 ? null : "You must be at least 18 years old.";
};

const validateFile = (value: File | null): string | null => {
  if (!value) {
    return null;
  }
  const file = value as File;
  if (!file.type.startsWith("image/")) {
    return "File must be an image";
  }
  if (file.size > 2 * 1024 * 1024) {
    return "File size must be less than 2MB";
  }
  return null;
};

type HobbyOtion = {
  label: string;
  value: string;
  checked: boolean;
};

const Day5Homework2 = () => {
  const hobbies = [
    { label: "Reading", value: "reading", checked: false },
    { label: "Traveling", value: "traveling", checked: false },
    { label: "Gaming", value: "gaming", checked: false },
  ];

  const countryOptions = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
  ];
  const [items, setItems] = useState<HobbyOtion[]>(hobbies);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    hobbies: items.filter((item) => item.checked).map((item) => item.value),
    avatar: null as File | null,
    bio: "",
    gender: "male",
    dateOfBirth: "",
    country: "",
  });

  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted with data:", formData);
  };

  const genderOptions = [
    { label: "Female", value: "0" },
    { label: "male", value: "1" },
    { label: "Other", value: "2" },
  ];

  const handleCheckboxChange = (
    event: ChangeEvent<HTMLInputElement>
  ): undefined => {
    const { value, checked } = event.target;
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.value === value ? { ...item, checked } : item
      )
    );
    if (checked) {
      setFormData((prevData) => ({
        ...prevData,
        hobbies: [...prevData.hobbies, value],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        hobbies: prevData.hobbies.filter((hobby) => hobby !== value),
      }));
    }
  };

  const validate = (): boolean => {
    return (
      validateEmail(formData.email) !== null ||
      validatePassword(formData.password) !== null ||
      validatePhoneNumber(formData.phoneNumber) !== null ||
      ageValidation(formData.dateOfBirth) !== null ||
      confirmPasswordValidation(confirmPassword, formData.password) !== null ||
      formData.country === "" ||
      formData.hobbies.length === 0 ||
      formData.bio.length > 300 ||
      formData.username.length < 3 ||
      validateFile(formData.avatar) !== null
    );
  };

  return (
    <div className="flex flex-row items-center justify-center p-4">
      <FormField
        onSubmit={handleFormSubmit}
        className="p-4 sm:p-2 gap-2 flex flex-col"
        children={
          <>
            <TextFormField
              label="Username"
              id="username"
              placeholder="Enter your username"
              onError={(value) => {
                if (value.length < 3) {
                  return "Username must be at least 3 characters long";
                }
                return null;
              }}
              onChange={(value) =>
                setFormData({ ...formData, username: value.target.value })
              }
            />
            <TextFormField
              label="Email"
              type="email"
              id="email"
              placeholder="Enter your email"
              onError={validateEmail}
              onChange={(value) =>
                setFormData({ ...formData, email: value.target.value })
              }
            />
            <TextFormField
              label="Password"
              type="password"
              placeholder="Enter your password"
              onError={validatePassword}
              onChange={(value) =>
                setFormData({ ...formData, password: value.target.value })
              }
            />
            <TextFormField
              label="Confirm Password"
              type="password"
              placeholder="Enter your password"
              onChange={(value) => setConfirmPassword(value.target.value)}
              onError={(value) => {
                const password = formData.password;
                return confirmPasswordValidation(value, password);
              }}
            />
            <TextFormField
              label="Phone Number"
              type="text"
              placeholder="Your phone number"
              onError={validatePhoneNumber}
              onChange={(value) =>
                setFormData({ ...formData, phoneNumber: value.target.value })
              }
            />
            <RadioGroup
              options={genderOptions}
              name="gender"
              id="gender"
              label="Gender"
              onChange={(value) => setFormData({ ...formData, gender: value })}
            />
            <DatePicker
              id="dateOfBirth"
              className="border border-gray-300 p-2 rounded-xl shadow-md"
              label="Date of Birth"
              onError={ageValidation}
              onChange={(value) => {
                console.log("Date of Birth changed:", value);
                setFormData({ ...formData, dateOfBirth: value });
              }}
            />
            <SelectList
              id="country"
              options={countryOptions}
              label="Country"
              onChange={(value) =>
                setFormData({ ...formData, country: value.toString() })
              }
            />
            <div className="grid grid-row-[auto_1fr]">
              <label className="text-gray-700 mb-2">Hobbies</label>
              <div className="flex flex-col gap-2">
                {items.map((item) => (
                  <Checkbox
                    key={item.value}
                    id={item.value}
                    label={item.label}
                    value={item.value}
                    checked={item.checked}
                    onChange={handleCheckboxChange}
                  />
                ))}
              </div>
            </div>
            <InputFileField
              label="Profiles Picture"
              type="file"
              id="profilePicture"
              onError={(value) => {
                if (!value) {
                  return null;
                }
                const file = value as File;
                if (
                  !file.name.endsWith(".jpg") &&
                  !file.name.endsWith(".png") &&
                  !file.name.endsWith(".jpeg")
                ) {
                  return "File must be an image";
                }
                if (file.size > 2 * 1024 * 1024) {
                  return "File size must be less than 2MB";
                }
                return null;
              }}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  avatar: value.target.files?.[0] || null,
                })
              }
            />
            <TextArea
              id="bio"
              label="Bio"
              maxLength={300}
              onError={(value) => {
                if (value.length > 300) {
                  return "Bio is limited to 300 characters";
                }
                return null;
              }}
              counter={true}
              className="border border-gray-300 p-2 rounded-xl shadow-md"
              onChange={(value) => setFormData({ ...formData, bio: value })}
            />
            <MButton
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-lg shadow-md disabled:bg-gray-200 disabled:text-gray-500 transition duration-200"
              children="Submit"
              disabled={validate()}
            />
          </>
        }
      />
    </div>
  );
};

export default Day5Homework2;
