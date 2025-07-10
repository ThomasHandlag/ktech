import React from "react";

interface AuthContextType {
  user: UserDay10 | null;
  setUser: (user: UserDay10 | null) => void;
}

export interface UserDay10 {
  id: string;
  password: string;
  email: string;
  accessToken: string;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export { AuthContext };
