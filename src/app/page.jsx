import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import SignInForm from "./components/signInPage-sections/SignInForm"; // Import the client component

export default function SignInPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  // If a token is present, redirect to the home page
  if (token) {
    redirect("/home");
  }

  return <SignInForm />;
}
