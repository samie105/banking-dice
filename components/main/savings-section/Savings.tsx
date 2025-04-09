import React from "react";
import LottieLoader from "./LottieLoader";
import Link from "next/link";

export default function Savings() {
  return (
    <div className="px-10 md:px-20 savings_cont grid md:grid-cols-2 flex-col-reverse grid-cols-1 my-8 md:my-32 items-center relative">
      <div className="absolute -left-16 /z-40 -top-5 md:-top-20 animate-pulse/ duration-1000 text-neutral-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-40"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
          />
        </svg>
      </div>
      <div className="text-cont pr-4">
        <div className="flex items-center gap-x-3">
          <div className="register py-2 px-3 bg-base-color/5 text-base-color/80 rounded-full font-semibold flex items-center text-xs gap-2 cursor-pointer hover:bg-[#]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path d="M3 3.5A1.5 1.5 0 0 1 4.5 2h1.879a1.5 1.5 0 0 1 1.06.44l1.122 1.12A1.5 1.5 0 0 0 9.62 4H11.5A1.5 1.5 0 0 1 13 5.5v1H3v-3ZM3.081 8a1.5 1.5 0 0 0-1.423 1.974l1 3A1.5 1.5 0 0 0 4.081 14h7.838a1.5 1.5 0 0 0 1.423-1.026l1-3A1.5 1.5 0 0 0 12.919 8H3.081Z" />
            </svg>

            <p>Savings</p>
          </div>
          <div className="register bg-green-500/5 text-xs text-green-500 py-2 px-3 rounded-full font-semibold flex items-center gap-2 cursor-pointer hover:bg-[#]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M2.22 2.22a.75.75 0 0 1 1.06 0L5.5 4.44V2.75a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-.75.75h-3.5a.75.75 0 0 1 0-1.5h1.69L2.22 3.28a.75.75 0 0 1 0-1.06Zm10.5 0a.75.75 0 1 1 1.06 1.06L11.56 5.5h1.69a.75.75 0 0 1 0 1.5h-3.5A.75.75 0 0 1 9 6.25v-3.5a.75.75 0 0 1 1.5 0v1.69l2.22-2.22ZM2.75 9h3.5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-1.69l-2.22 2.22a.75.75 0 0 1-1.06-1.06l2.22-2.22H2.75a.75.75 0 0 1 0-1.5ZM9 9.75A.75.75 0 0 1 9.75 9h3.5a.75.75 0 0 1 0 1.5h-1.69l2.22 2.22a.75.75 0 1 1-1.06 1.06l-2.22-2.22v1.69a.75.75 0 0 1-1.5 0v-3.5Z"
                clipRule="evenodd"
              />
            </svg>

            <p>Investment</p>
          </div>
        </div>
        <div className="large-text text-3xl md:text-5xl mt-3 font-semibold text-neutral-700">
          Save & <span className="text-base-color/80/ fon/t-bold">Invest</span>{" "}
          with Us
        </div>
        <div className="small-text text-base md:text-lg mt-3 leading-6 font-medium text-neutral-500 text-balance">
          Experience unparalleled savings and investment opportunities at{" "}
          <span className="font-semibold">Swift Nexus</span>, where your
          financial growth and security are our top priorities. Join us to take
          advantage of our expert financial guidance and comprehensive
          solutions.
        </div>
        <div className="flex mt-8 text-sm gap-x-2 md:justify-start">
          {" "}
          <Link
            href={"/auth/login"}
            className="  px-6 py-4 rounded-full bg-base-color/80 font-bold text-white flex items-center gap-3 cursor-pointer hover:bg-[#]"
          >
            <p>Start Investing</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 block"
            >
              <path
                fillRule="evenodd"
                d="M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10Z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
          <Link
            href={"/auth/login"}
            className=" bg-neutral-50 hidden hover:bg-neutral-100 transition-all lg:flex px-6 py-4 rounded-full font-bold text-neutral-600  items-center gap-3 cursor-pointer hover:bg-[#]"
          >
            <p>Create an Account</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 block"
            >
              <path
                fillRule="evenodd"
                d="M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10Z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
      <div className="lottie order-first /md:order-none">
        <LottieLoader />
      </div>
      <div></div>
    </div>
  );
}
