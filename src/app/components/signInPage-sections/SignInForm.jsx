"use client";

import { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import InputField from "../inputs/InputField";
import Button from "../navs/Button";
import { Input } from "@/components/ui/input";

export default function SignInForm() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const router = useRouter(); // For programmatic navigation
  const { setUser } = useContext(UserContext); // Access setUser from context

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the login API
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.error) {
        // If an error occurs, set the error message
        setError(result.error);
      } else {
        setError(null); // Clear any previous errors
        // Redirect to the home page after successful login
        setUser(result.username);
        router.push("/home");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="mx-auto mt-20 flex w-11/12 flex-col gap-6">
      <div className="flex flex-col gap-10">
        <img
          src="/assets/svg/logo.svg"
          alt="logo"
          className="mx-auto hidden w-10 dark:block"
        />
        <img
          src="/assets/svg/logoDark.svg"
          alt="logo"
          className="mx-auto w-10 dark:hidden"
        />
        <div className="my-4">
          <h1 className="text-xl">Sign in to your account</h1>
        </div>
      </div>

      {error && (
        <div className="text-red-500">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4 grid w-full max-w-sm items-center gap-1.5">
          <label htmlFor="username" className="font-satoshi font-light">
            Username
          </label>
          <Input
            type="text"
            name="username"
            placeholder="Enter Username..."
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
        </div>
        <div className="mb-4 grid w-full max-w-sm items-center gap-1.5">
          <label htmlFor="username" className="font-satoshi font-light">
            Password
          </label>
          <Input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>
        <div className="flex pt-4">
          <Button content="Sign In" btnType="third" type="submit" />
        </div>
      </form>

      <div className="flex items-center justify-center gap-2 font-light">
        <p className="italic text-textgray">New user?</p>
        <Link href="/sign-up" className="font-normal">
          Create account
        </Link>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <div className="my-4">
          <h1 className="text-xl">Continue with guest account</h1>
          <p className="mt-2 italic text-textgray">
            You can continue without creating an account as a guest user.
          </p>
        </div>
        <div className="">
          <Link
            href="/home"
            className="mb-2 flex w-full items-center justify-center rounded bg-darkgray px-5 py-2.5 font-satoshi font-bold text-offwhite dark:bg-offwhite dark:text-darkgray"
          >
            Continue as guest
          </Link>
        </div>
      </div>
    </div>
  );
}
