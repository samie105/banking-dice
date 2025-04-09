"use client";
import { useColors } from "@/context/colorContext";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Headerstuffs() {
  const colors = useColors();
  return (
    <div className="md:px-20 md:mb-5 px-10 /mb-3">
      <div className="absolute top-0 right-10 /pacity-10 w-full -z-10 h-full">
        <Image
          src="/assets/gridlines.svg"
          alt=""
          width={1000}
          height={1000}
          className="h-full/ size-52   opacity-25  parallax-image  /object-cover"
        />
      </div>
      <div className="flex flex-col md:flex-row item-center md:justify-between relative  w-full md:gap-10 gap-5 pb-8 /px-14">
        <div className="text-4xl font-semibold z-20 text-neutral-700 ">
          <span style={{ color: colors.defaultblue + "96" }}>Speak</span> with
          <br /> us
        </div>
        <div className="text-wrap font-medium md:text-base /text-center md:px-5 text-sm text-neutral-500">
          Swift Nexus Priotized security and other <br /> essential factor to
          give users the feel of safety and trust <br /> with our ever-active
          support system to tend to all your needs.
        </div>{" "}
        <div className="md:flex hidden">
          {" "}
          <Link
            href="#"
            className="flex h-12 bg-base-color/80 dark:bg-base-color/80  items-center justify-center gap-x-2 text-nowrap rounded-full px-8 text-sm /font-medium font-bold text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 d dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          >
            <p>{"Create an account"}</p>{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5"
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
    </div>
  );
}
// <div className="flex items-center md:justify-center gap-x-3">
//       <div
//         className="register p-2 rounded-full font-bold flex items-center text-xs gap-2 cursor-pointer hover:bg-[#]"
//         style={{
//           background: colors.defaultblue + "10",
//           color: colors.defaultblue,
//         }}
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 16 16"
//           fill="currentColor"
//           className="size-4"
//         >
//           <path d="M13.407 2.59a.75.75 0 0 0-1.464.326c.365 1.636.557 3.337.557 5.084 0 1.747-.192 3.448-.557 5.084a.75.75 0 0 0 1.464.327c.264-1.185.444-2.402.531-3.644a2 2 0 0 0 0-3.534 24.736 24.736 0 0 0-.531-3.643ZM4.348 11H4a3 3 0 0 1 0-6h2c1.647 0 3.217-.332 4.646-.933C10.878 5.341 11 6.655 11 8c0 1.345-.122 2.659-.354 3.933a11.946 11.946 0 0 0-4.23-.925c.203.718.478 1.407.816 2.057.12.23.057.515-.155.663l-.828.58a.484.484 0 0 1-.707-.16A12.91 12.91 0 0 1 4.348 11Z" />
//         </svg>

//         <p>Support</p>
//       </div>
//       {/* <div className="register bg-green-700/10 text-xs text-green-500 p-2 rounded-full font-bold flex items-center gap-2 cursor-pointer hover:bg-[#]">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 16 16"
//             fill="currentColor"
//             className="w-4 h-4"
//           >
//             <path
//               fillRule="evenodd"
//               d="M2.22 2.22a.75.75 0 0 1 1.06 0L5.5 4.44V2.75a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-.75.75h-3.5a.75.75 0 0 1 0-1.5h1.69L2.22 3.28a.75.75 0 0 1 0-1.06Zm10.5 0a.75.75 0 1 1 1.06 1.06L11.56 5.5h1.69a.75.75 0 0 1 0 1.5h-3.5A.75.75 0 0 1 9 6.25v-3.5a.75.75 0 0 1 1.5 0v1.69l2.22-2.22ZM2.75 9h3.5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-1.69l-2.22 2.22a.75.75 0 0 1-1.06-1.06l2.22-2.22H2.75a.75.75 0 0 1 0-1.5ZM9 9.75A.75.75 0 0 1 9.75 9h3.5a.75.75 0 0 1 0 1.5h-1.69l2.22 2.22a.75.75 0 1 1-1.06 1.06l-2.22-2.22v1.69a.75.75 0 0 1-1.5 0v-3.5Z"
//               clipRule="evenodd"
//             />
//           </svg>

//           <p>Investment</p>
//         </div> */}
//     </div>
//     <div className="cont mt-2 md:text-center">
//       {" "}
//       <div className="large-text font-bold text-2xl">
//         Have Questions or Need assistance
//       </div>
//       <div className="small-text text-sm font-medium mt-2 /text-balance ">
//         Our dedicated team is here to help. Contact us today for personalized{" "}
//         <br className="hidden md:block" />
//         support and expert guidance because your satisfaction
//       </div>
//     </div>
