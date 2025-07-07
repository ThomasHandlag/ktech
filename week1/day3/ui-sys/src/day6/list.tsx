import { useEffect, useState } from "react";
import MButton from "../widgets/common/m_button";
import SnackBar from "../widgets/common/snack_bar";
import Update from "./update";
import CreateUser from "./create";

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  birthday: string;
  email: string;
};

export type ListProductsProps = {
  reload: boolean;
};

const baseUrl = "https://server.aptech.io/online-shop/customers";

// const pageing = "?offset=0&limit=10";

const ListProducts = (props: ListProductsProps) => {
  const { reload } = props;

  const [loading, setLoading] = useState<boolean>(true);

  const [users, setUsers] = useState<User[]>([]);

  const [modal, setModal] = useState<boolean>(false);

  const [snackbar, setSnackbar] = useState({ isShow: false, message: "" });

  const [userID, setUserID] = useState<number | null>(null);

  const createUser = async (user: User) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    const urlencoded = new URLSearchParams();
    urlencoded.append("firstName", user.firstName);
    urlencoded.append("lastName", user.lastName);
    urlencoded.append("phoneNumber", user.phoneNumber);
    urlencoded.append("address", user.address);
    urlencoded.append("birthday", user.birthday);
    urlencoded.append("email", user.email);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };

    try {
      const response = await fetch(`${baseUrl}`, requestOptions);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const createdUser = await response.json();
      setUsers((prev) => [...prev, createdUser]);
      setModal(false);
    } catch (error) {
      setSnackbar({ isShow: true, message: (error as Error).message });
    }
  };

  const deleteUser = async (userId: number) => {
    try {
      const response = await fetch(`${baseUrl}/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      setUsers((prev) => prev.filter((user) => user.id !== userId));
    } catch (error) {
      setSnackbar({ isShow: true, message: (error as Error).message });
    }
  };

  const updateUser = async (user: User) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    const urlencoded = new URLSearchParams();
    urlencoded.append("firstName", user.firstName);
    urlencoded.append("lastName", user.lastName);
    urlencoded.append("phoneNumber", user.phoneNumber);
    urlencoded.append("address", user.address);
    urlencoded.append("birthday", user.birthday);
    urlencoded.append("email", user.email);

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: urlencoded,
    };

    try {
      const response = await fetch(`${baseUrl}/${user.id}`, requestOptions);
      if (!response.ok) {
        throw new Error("Failed to update user");
      }
      const updatedUser = await response.json();
      setUsers((prev) =>
        prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
      );
    } catch (error) {
      setSnackbar({ isShow: true, message: (error as Error).message });
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${baseUrl}`, { method: "GET" });
        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }
        const data: User[] = await res.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        setSnackbar({ isShow: true, message: (error as Error).message });
      }
    };
    fetchUsers();
  }, [reload]);
  return (
    <div>
      <div>
        <h1>Products</h1>
        <MButton
          onClick={() => {
            setModal(true);
          }}
          children="create"
          className="capitalize bg-blue-500 text-white px-4 py-2 rounded mb-4"
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Birthday</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <Item
                  key={user.id}
                  setModal={() => {}}
                  user={user}
                  onDelete={deleteUser}
                />
              ))}
          </tbody>
        </table>
      )}
      <CreateUser
        isShow={modal}
        onClick={(e) => {
          createUser(e);
          setModal(false);
        }}
        onClickOutside={() => {
          setModal(false);
        }}
      />

      <Update
        isShow={userID !== null}
        userId={userID ?? null}
        onUpdate={(e) => {
          updateUser(e);
          setUserID(null);
        }}
      />

      <SnackBar message={snackbar.message} />
    </div>
  );
};

export default ListProducts;

export type ItemProps = {
  user: User;
  onDelete: (userId: number) => void;
  setModal?: () => void;
};

export const Item = (props: ItemProps) => {
  const { user } = props;
  return (
    <tr key={user.id}>
      <td>{user.id}</td>
      <td>{`${user.firstName} ${user.lastName}`}</td>
      <td>{user.phoneNumber}</td>
      <td>{user.address}</td>
      <td>{user.birthday}</td>
      <td>{user.email}</td>
      <td>
        <MButton
          children="Edit"
          className="bg-yellow-500 text-white px-2 py-1 rounded"
          onClick={() => {
            console.log("update", user);
            props.setModal?.();
          }}
        />
        <MButton
          children="Delete"
          className="bg-red-500 text-white px-2 py-1 rounded ml-2"
          onClick={props.onDelete.bind(null, user.id!)}
        />
      </td>
    </tr>
  );
};
