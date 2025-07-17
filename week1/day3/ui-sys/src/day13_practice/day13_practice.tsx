import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";
import { useAuthStore } from "./api/useAuthStore";

const Day13Practice = () => {
  const navigate = useNavigate();

  const {
    loggedInUser,
  } = useAuthStore((state) => state);

  useEffect(() => {
    if (!loggedInUser) {
      navigate("login");
    } else {
      navigate("workspace");
    }
  }, [loggedInUser, navigate]);

  return (
    <div className="h-full">
      <Outlet />
    </div>
  );
};

export default Day13Practice;
