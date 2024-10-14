import Link from "next/link";
import InputField from "./components/inputs/InputField";
import Button from "./components/navs/Button";

export default function SignInPage() {
  return (
    <div className="w-11/12 mx-auto mt-20 flex flex-col gap-6">
    <div className="flex flex-col gap-10">
        <img src="/assets/svg/logo.svg" alt="logo" className="hidden dark:block w-10 mx-auto" />
        <img src="/assets/svg/logoDark.svg" alt="logo" className="dark:hidden w-10 mx-auto" />
        <div className="my-4">
            <h1 className="text-xl">Sign in to your account</h1>
        </div>
    </div>

    <form >
        <InputField
            inputType="primary"
            label="Username"
            labelFor="username"
            type="text"
            name="username"
            placeholder="Enter Username..."
         
            
        />
        <InputField
            inputType="primary"
            label="Password"
            labelFor="password"
            type="password"
            name="password"
            placeholder="Enter password"
           
            
        />
        <div className="flex pt-4">
            <Button content="Sign In" btnType="third" type="submit" />
        </div>
    </form>

    <div className="flex justify-center items-center gap-2 font-light">
        <p className="text-textgray italic">New user?</p>
        <Link href="/sign-up" className="font-normal">
            Create account
        </Link>
    </div>
    <div className="flex flex-col gap-2 mt-4">
        <div className="my-4">
            <h1 className="text-xl">Continue with guest account</h1>
            <p className="text-textgray italic mt-2">You can continue without creating an account as a guest user.</p>
        </div>
        <div className="">
        <Link href="/home" className="flex justify-center items-center bg-darkgray w-full dark:bg-offwhite text-offwhite dark:text-darkgray font-bold font-satoshi rounded px-5 py-2.5 mb-2">
            Continue as guest
        </Link>
    </div>
    </div>
</div>
  );
}
