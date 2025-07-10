import { Outlet, useLoaderData, useNavigate } from "react-router";
import { AuthContext, type UserDay10 } from "./context_day10";
import { useEffect, useState } from "react";

const Day10Practice = () => {
  const loadedUser = useLoaderData<UserDay10 | null>();
  const navigate = useNavigate();

  const [user, setUser] = useState<UserDay10 | null>(loadedUser);

  useEffect(() => {
    if (!user) {
      navigate("login");
    } else {
      navigate("workspace");
    }
  }, [user, navigate]);

  return (
    <div className="h-full">
      <AuthContext.Provider value={{ user, setUser }}>
        <Outlet />
      </AuthContext.Provider>
    </div>
  );
};

export default Day10Practice;
