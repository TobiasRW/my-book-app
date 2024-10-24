import Link from "next/link";
import { IoLibrarySharp } from "react-icons/io5";

export default function GuestView() {
  return (
    <>
      <div className="mt-10">
        <div className="flex flex-col gap-2">
          <p className="text-xl italic">Welcome to the Library!</p>
          <p className="text-lg font-light">
            To save and organize your books, please create an account or log in.
            Your personal library is just a click away!
          </p>
        </div>
        <div className="mt-10 flex flex-col gap-8">
          <Link
            href="/"
            className="mb-2 flex w-full items-center justify-center rounded bg-darkgray px-5 py-2.5 font-satoshi font-bold text-offwhite dark:bg-offwhite dark:text-darkgray"
          >
            Log in
          </Link>
          <Link
            href="/sign-up"
            className="mb-2 flex w-full items-center justify-center rounded bg-darkgray px-5 py-2.5 font-satoshi font-bold text-offwhite dark:bg-offwhite dark:text-darkgray"
          >
            Sign up
          </Link>
        </div>
        <div className="mt-14 flex flex-col gap-8">
          <IoLibrarySharp className="self-center text-6xl" />
          <p className="text-lg font-light">
            With your account, you can create custom shelves, organize your
            books, and track your reading progress. Start building your personal
            library today!
          </p>
        </div>
      </div>
    </>
  );
}
