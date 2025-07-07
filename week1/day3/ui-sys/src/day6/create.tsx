import { useState } from "react";
import type { User } from "./list";
import Modal from "../widgets/common/modal";
import TextField from "../widgets/common/text_field";

type CreateUserProps = {
  onClick: (user: User) => void;
  isShow: boolean;
  onClickOutside?: () => void;
};

const CreateUser = (props: CreateUserProps) => {
  const [cuser, setProduct] = useState<User>({
    id: 0,
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    birthday: "",
    email: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): undefined => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Modal
      isShow={props.isShow}
      title="Create User"
      onClickOutside={props.onClickOutside}
      closeLabel="Create"
      className="flex flex-col gap-2 bg-white"
      onClose={() => {
        props.onClick(cuser);
      }}
      children={
        <div className="p-4 flex flex-col gap-2">
          <TextField
            name="firstName"
            placeholder="First Name"
            value={cuser.firstName}
            onChange={onChange}
          />
          <TextField
            name="lastName"
            placeholder="Last Name"
            value={cuser.lastName}
            onChange={onChange}
          />
          <TextField
            name="phoneNumber"
            placeholder="Phone Number"
            value={cuser.phoneNumber}
            onChange={onChange}
          />
          <TextField
            name="address"
            placeholder="Address"
            value={cuser.address}
            onChange={onChange}
          />
          <TextField
            name="birthday"
            type="date"
            value={cuser.birthday}
            onChange={onChange}
          />
          <TextField
            name="email"
            type="email"
            placeholder="Email"
            value={cuser.email}
            onChange={onChange}
          />
        </div>
      }
    />
  );
};

export default CreateUser;
