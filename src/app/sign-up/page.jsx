import Link from "next/link";
import InputField from "../components/inputs/InputField";
import Button from "../components/navs/Button";


export default function SignUpPage() {
    return (
        <div className="w-11/12 mx-auto mt-20 flex flex-col gap-6">
            <div className="flex flex-col gap-10 ">
                <img src="/assets/svg/logo.svg" alt="logo" className="hidden dark:block w-10 mx-auto" />
                <img src="/assets/svg/logoDark.svg" alt="logo" className="dark:hidden w-10 mx-auto" />
                <div className="my-4">
                    <h1 className="text-xl">Sign Up to Book Buddy</h1>
                </div>
            </div>
            <form action="#" className="">
                <InputField inputType="primary" label="Username" labelFor="username" type="text" name="username" placeholder="Enter Username..." />
                <InputField inputType="primary" label="Password" labelFor="password" type="password" name="password" placeholder="Enter password" />
                <InputField inputType="primary" label="Confirm Password" labelFor="confirmPassword" type="password" name="confirmPassword" placeholder="Confirm password" />
                <div className="flex pt-4">
                    <Button content="Create Account" btnType="third" type="submit" />
                </div>
                <div className="flex justify-center items-center gap-2 mt-4 font-light">
                    <p className="text-textgray italic">Already have an account?</p>
                    <Link href="/sign-in" className="font-normal">
                        Sign In
                    </Link>
                </div>
            </form>
        </div>
    )
}