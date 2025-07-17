import SignInForm from "@/components/custom/signin_form";
import { PiTelevision } from "react-icons/pi";
import { getCsrfToken } from "next-auth/react";
import { Suspense } from "react";
const Page = async () => {
  const csrfToken = await getCsrfToken();

  return (
    <div className="flex flex-row h-full">
      <div className="bg-blue-500 flex flex-col w-2/6 p-10 items-center justify-center gap-5 ">
        <div className="flex gap-4">
          <PiTelevision size={24} />
          <span className="text-white text-2xl font-semibold capitalize">
            Tasks Schedules system
          </span>
        </div>
        <span className="text-white text-3xl font-bold capitalize">
          a few clicks away
          <br /> from creating your <br /> Tasks Schedules workspace for your
          team
        </span>
      </div>
      <Suspense>
        <SignInForm csrfToken={csrfToken} />
      </Suspense>
    </div>
  );
};

export default Page;
