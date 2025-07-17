"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, ChangeEvent } from "react";
import { toast } from "sonner";

const SignInForm = ({ csrfToken }: { csrfToken: string | undefined }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push(callbackUrl);
    }
  }, [status, router, callbackUrl]);

  const [loading, setLoading] = useState({
    accLoading: false,
    googleLoading: false,
    facebookLoading: false,
  });
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading({
        ...loading,
        accLoading: true,
      });
      setFormValues({ email: "john@mail.com", password: "changeme" });

      const res = await signIn("credentials", {
        redirect: false,
        email: formValues.email,
        password: formValues.password,
        csrfToken,
        callbackUrl,
      });

      setLoading({
        ...loading,
        accLoading: false,
      });

      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        setError("Invalid email or password");
      }
    } catch (cerror) {
      setLoading({
        ...loading,
        accLoading: false,
      });
      setError((cerror as Error).message || "An error occurred");
      toast.error(error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div className="p-30 flex flex-col w-4/6 justify-center text-blue-900 items-start">
      <span className="text-2xl font-semibold capitalize mb-10">
        Login: auth only work on this sub page
      </span>
      <form onSubmit={onSubmit} className="w-full flex flex-col gap-5">
        <input type="hidden" name="csrfToken" defaultValue={csrfToken} />
        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col">
            <label className="text-sm font-semibold">Email</label>
            <input
              type="email"
              required
              onChange={handleChange}
              name="email"
              className="border border-gray-300 rounded p-2"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-semibold">
              Password
            </label>
            <input
              required
              type="password"
              onChange={handleChange}
              name="password"
              id="password"
              className="border border-gray-300 rounded p-2"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" className="h-4 w-4" />
          <label className="text-sm capitalize">remember me</label>
        </div>
        <div className="grid grid-cols-4 gap-5">
          <button
            type="submit"
            disabled={loading.accLoading}
            className="bg-blue-500 col-span-1 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer transition-colors duration-200"
          >
            {loading.accLoading ? "Signing in..." : "Sign In"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
