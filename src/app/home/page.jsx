'use client';

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Reccomended from "./components/Recommended";
import TopNav from "../components/navs/Back";
import { IoIosSettings } from "react-icons/io"


export default function Home() {
  const [user, setUser] = useState('Guest');
  const router = useRouter();


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/user', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
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
    fetchUser();
  }, []);

  return (
    <div className="flex flex-col gap-4 w-11/12 mx-auto">
      <div className="mt-8 flex justify-between items-center">
        <h1 className="font-satoshi text-3xl font-bold">Book Buddy</h1>
        {user !== 'Guest' && (
          <Link href="/settings" className=" bg-offwhite dark:bg-darkgray p-1 rounded-full text-xl text-darkgray dark:text-offwhite">
            <IoIosSettings />
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
