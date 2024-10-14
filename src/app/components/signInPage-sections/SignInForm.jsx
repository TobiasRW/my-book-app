'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import InputField from '../inputs/InputField';
import Button from '../navs/Button';

export default function SignInForm() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);
  const router = useRouter(); // For programmatic navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the login API
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.error) {
        // If an error occurs, set the error message
        setError(result.error);
      } else {
        setError(null); // Clear any previous errors
        // Redirect to the home page after successful login
        router.push('/home');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="w-11/12 mx-auto mt-20 flex flex-col gap-6">
      <div className="flex flex-col gap-10">
        <img
          src="/assets/svg/logo.svg"
          alt="logo"
          className="hidden dark:block w-10 mx-auto"
        />
        <img
          src="/assets/svg/logoDark.svg"
          alt="logo"
          className="dark:hidden w-10 mx-auto"
        />
        <div className="my-4">
          <h1 className="text-xl">Sign in to your account</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <InputField
          inputType="primary"
          label="Username"
          labelFor="username"
          type="text"
          name="username"
          placeholder="Enter Username..."
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
        <InputField
          inputType="primary"
          label="Password"
          labelFor="password"
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <div className="flex pt-4">
          <Button content="Sign In" btnType="third" type="submit" />
        </div>
      </form>

      {error && (
        <div className="text-red-500 mt-2">
          <p>{error}</p>
        </div>
      )}

      <div className="flex justify-center items-center gap-2 font-light">
        <p className="text-textgray italic">New user?</p>
        <Link href="/sign-up" className="font-normal">
          Create account
        </Link>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <div className="my-4">
          <h1 className="text-xl">Continue with guest account</h1>
          <p className="text-textgray italic mt-2">
            You can continue without creating an account as a guest user.
          </p>
        </div>
        <div className="">
          <Link
            href="/home"
            className="flex justify-center items-center bg-darkgray w-full dark:bg-offwhite text-offwhite dark:text-darkgray font-bold font-satoshi rounded px-5 py-2.5 mb-2"
          >
            Continue as guest
          </Link>
        </div>
      </div>
    </div>
  );
}
