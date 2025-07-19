import { Outlet, useNavigate } from "react-router";
import { useAuthStore } from "./api/useAuthStore";
import { useEffect } from "react";
const Day13Practice = () => {
  const { loggedInUser: user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("login");
    } else {
      navigate("workspace");
    }
  }, [user, navigate]);
  
  return (
    <div className="h-full">
      <Outlet />
    </div>
  );
};

export default Day13Practice;
