"use client";


import Reccomended from "../components/homePage-sections/Recommended";
import TopNav from "../components/navs/Back";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 w-11/12 mx-auto">
      <div className="mt-4">
        <h1 className="font-satoshi text-4xl">Book Buddy</h1>
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
