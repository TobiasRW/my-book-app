'use client';

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Reccomended from "./components/Recommended";
import TopNav from "../components/navs/Back";
import { IoIosSettings } from "react-icons/io"
import { PiSignInFill } from "react-icons/pi";


export default function Home() {
  const [user, setUser] = useState('Guest');
  const router = useRouter();

  // UseEffect to fetch the current user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/user', { // Fetch the user from the /api/user endpoint
          method: 'GET',
          credentials: 'include', // Include cookies in the request
        });
        const data = await response.json(); // Parse the response JSON data

        // console.log('User data fetched from /api/user:', data);

        // If a valid username is returned, set the user state to the username. Otherwise, set it to 'Guest'
        if (data.username) {
          setUser(data.username);
        } else {
          setUser('Guest');
        }
      } catch (err) {
        console.error(err);
        setUser('Guest');
      }
    };
  
    fetchUser(); // Call the fetchUser function
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  

  return (
    <div className="flex flex-col gap-4 w-11/12 mx-auto">
      <div className="mt-8 flex justify-between items-center">
        <h1 className="font-satoshi text-3xl font-bold">Book Buddy</h1>
        {user !== 'Guest' && (
          <Link href="/settings" className=" bg-offwhite dark:bg-darkgray p-1 rounded-full text-xl text-darkgray dark:text-offwhite">
            <IoIosSettings />
          </Link>
        )}
        {user === 'Guest' && (
          <Link href="/" className=" bg-offwhite dark:bg-darkgray p-1 rounded-full text-xl text-darkgray dark:text-offwhite">
            <PiSignInFill />
          </Link>
        )}
      </div>
      <div className=" ">
        <h2 className="font-satoshi font-light text-2xl">Welcome {user}</h2> {/* Dynamic Welcome Message */}
      </div>
      <div className=" ">
        <h2 className="font-satoshi font-light text-2xl">Reading Now</h2>
      </div>
      <div className=" ">
        <h2 className="font-satoshi font-light text-2xl mb-4">Recommended</h2>
        {/* <Reccomended /> */}
      </div>
      {/* <div className="flex justify-center mt-10">
        <div className="w-64 sm:w-80 md:w-96 lg:w-[28rem] xl:w-[32rem] 2xl:w-[36rem]">
          <LogoAnimation width="100%" />
        </div>
      </div> */}
      <div className=""></div>
    </div>
  );
}
