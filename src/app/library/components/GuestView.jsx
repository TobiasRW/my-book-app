import Link from 'next/link';
import { IoLibrarySharp } from "react-icons/io5";

export default function GuestView() {
    return (
        <>
            <div className="mt-10">
                <div className="flex flex-col gap-2">
                    <p className="text-xl italic">Welcome to the Library!</p>
                    <p className="text-lg font-light">To save and organize your books, please create an account or log in. Your personal library is just a click away!</p>
                </div>
                <div className="flex flex-col gap-8 mt-10">
                    <Link href="/" className="flex justify-center items-center bg-darkgray w-full dark:bg-offwhite text-offwhite dark:text-darkgray font-bold font-satoshi rounded px-5 py-2.5 mb-2">Log in</Link>
                    <Link href="/sign-up" className="flex justify-center items-center bg-darkgray w-full dark:bg-offwhite text-offwhite dark:text-darkgray font-bold font-satoshi rounded px-5 py-2.5 mb-2">Sign up</Link>
                </div>
                <div className="mt-14 flex flex-col gap-8">
                    <IoLibrarySharp className="text-6xl self-center" />
                    <p className="text-lg font-light">With your account, you can create custom shelves, organize your books, and track your reading progress. Start building your personal library today!</p>
                </div>
            </div>
        </>
    )
}