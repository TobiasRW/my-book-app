'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import InputField from "../components/inputs/InputField";
import Button from "../components/navs/Button";
import { Input } from "@/components/ui/input"

export default function SignUpPage() {
    const [formData, setFormData] = useState({ username: "", password: "", confirmPassword: "" });
    const [error, setError] = useState(null);
    const router = useRouter();

    // Handle form submission when the user tries to sign up
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior (page reload)

        // Check if the password and confirm password fields match
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return; // Exit the function to prevent further execution
        }

        // Make a POST request to the create_user API endpoint
        try {
            const response = await fetch("/api/create_user", { // Fetch the /api/create_user endpoint
                method: "POST",
                headers: { "Content-Type": "application/json" }, // Set the content type to JSON
                body: JSON.stringify({
                    username: formData.username, // Send the username from the form data
                    password: formData.password, // Send the password from the form data
                }),
            });

            // Parse the JSON response from the server
            const result = await response.json();

            // If an error occurred, set the error state
            if (result.error) {
                setError(result.error); // Display the error message from the API response
                // console.error("An error occurred:", result.error);
            } else {
                // If successful, clear the error state and redirect to '/' (login page)
                setError(null);
                router.push("/");
            }
        } catch (err) {
            // console.error("An error occurred:", err);
            setError("An error occurred while creating your account."); // Display a generic error message if an error occurred
        }
    };

    return (
        <div className="w-11/12 mx-auto mt-20 flex flex-col gap-6">
            <div className="flex flex-col gap-10">
                <img src="/assets/svg/logo.svg" alt="logo" className="hidden dark:block w-10 mx-auto" />
                <img src="/assets/svg/logoDark.svg" alt="logo" className="dark:hidden w-10 mx-auto" />
                <div className="my-4">
                    <h1 className="text-xl">Sign Up to Book Buddy</h1>
                </div>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <form onSubmit={handleSubmit}>
                <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
                    <label htmlFor="username" className="font-light font-satoshi">Username</label>
                    <Input
                        type="text"
                        name="username"
                        placeholder="Enter Username..."
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    />
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
                    <label htmlFor="password" className="font-light font-satoshi">Password</label>
                    <Input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                </div>
   
                <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
                    <label htmlFor="confirmPassword" className="font-light font-satoshi">Confrim password</label>
                    <Input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    />
                </div>
                <div className="flex pt-4">
                    <Button content="Create Account" btnType="third" type="submit" />
                </div>
            </form>

            <div className="flex justify-center items-center gap-2 mt-4 font-light">
                <p className="text-textgray italic">Already have an account?</p>
                <Link href="/" className="font-normal">
                    Sign In
                </Link>
            </div>
        </div>
    );
}
