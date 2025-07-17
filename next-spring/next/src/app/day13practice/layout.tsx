import { NextAuthProvider } from "@/provider/authProvider";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <NextAuthProvider>{children}</NextAuthProvider>;
};

export default Layout;
