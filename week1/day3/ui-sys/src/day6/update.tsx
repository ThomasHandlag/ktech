import { useEffect, useState } from "react";
import Modal from "../widgets/common/modal";
import TextField from "../widgets/common/text_field";
import type { User } from "./list";

type UpdateProps = {
  onUpdate: (user: User) => void;
  userId: number | null;
  onClickOutside?: () => void;
  isShow: boolean;
};

const Update = (props: UpdateProps) => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    birthday: "",
    email: "",
  });

  const baseUrl = "https://server.aptech.io/online-shop/customers";

  useEffect(() => {
    // Initialize form data with the provided customer data
    const fetchCustomerData = async () => {
      try {
        const response = await fetch(baseUrl + "/" + props.userId);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    fetchCustomerData().then((data) => {
      if (data) {
        setUser({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          phoneNumber: data.phoneNumber || "",
          address: data.address || "",
          birthday: data.birthday || "",
        });
      }
    });
  }, [props.userId]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): undefined => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Modal
      isShow={props.isShow}
      title="Update User"
      onClickOutside={props.onClickOutside}
      closeLabel="Update"
      className="flex flex-col gap-2 bg-white"
      onClose={() =>
        props.onUpdate({
          ...user,
          id: props.userId!,
        })
      }
      children={
        <div className="flex flex-col gap-2 w-full">
          <TextField
            name="firstName"
            placeholder="First Name"
            value={user.firstName}
            onChange={onChange}
          />
          <TextField
            name="lastName"
            placeholder="Last Name"
            value={user.lastName}
            onChange={onChange}
          />
          <TextField
            name="phoneNumber"
            placeholder="Phone Number"
            value={user.phoneNumber}
            onChange={onChange}
          />
          <TextField
            name="address"
            placeholder="Address"
            value={user.address}
            onChange={onChange}
          />
          <TextField
            name="birthday"
            type="date"
            value={user.birthday}
            onChange={onChange}
          />
          <TextField
            name="email"
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={onChange}
          />
        </div>
      }
    />
  );
};

export default Update;
