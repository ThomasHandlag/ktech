import { redirect } from "next/navigation";

const Page = () => {

  redirect("/day13practice/dashboard");

  return <div className="flex flex-row h-full"></div>;
};

export default Page;
