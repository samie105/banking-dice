"use client";
import { useColors } from "@/context/colorContext";
import Image from "next/image";
import Link from "next/link";

export default function Flight() {
  const colors = useColors();
  return (
    <section className=" py-12 md:px-12 lg:px-28 px-5  w-full h-full relative overflow-hidden">
      <div className="overlay absolute top-0 left-0 bg-gradient-to-tr from-black/70 via-black/95 to-black  md:bg-gradient-to-r md:from-black/50 md:via-black md:to-black w-full h-full z-20"></div>
      <div className="absolute z-30 right-0 top-0 md:top-5 text-neutral-800/60">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-28 md:size-40 -rotate-45"
        >
          <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
        </svg>
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-fixed bg-repeat z-10 /opacity-10">
        <Image
          src="/assets/flight.jpg"
          width="1000"
          height="1000"
          alt="Flight booking"
          className="mx-auto aspect-video overflow-hidden h-full w-full object-cover object-center sm:w-full z-20"
        />
      </div>
      <div className=" grid md:grid-cols-2 items-center  /py-6 z-30 /px-4  overflow-hidden lg:gap-10">
        <div className=""></div>{" "}
        <div className="space-y-4 order-last md:py-12 py-5 z-40 md:pr-10/">
          <div className=" rounded-full inline-flex items-center gap-x-2  bg-neutral-700/30 px-3 py-2 text-white text-xs ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-4"
            >
              <path d="M14 6H6v8h8V6Z" />
              <path
                fillRule="evenodd"
                d="M9.25 3V1.75a.75.75 0 0 1 1.5 0V3h1.5V1.75a.75.75 0 0 1 1.5 0V3h.5A2.75 2.75 0 0 1 17 5.75v.5h1.25a.75.75 0 0 1 0 1.5H17v1.5h1.25a.75.75 0 0 1 0 1.5H17v1.5h1.25a.75.75 0 0 1 0 1.5H17v.5A2.75 2.75 0 0 1 14.25 17h-.5v1.25a.75.75 0 0 1-1.5 0V17h-1.5v1.25a.75.75 0 0 1-1.5 0V17h-1.5v1.25a.75.75 0 0 1-1.5 0V17h-.5A2.75 2.75 0 0 1 3 14.25v-.5H1.75a.75.75 0 0 1 0-1.5H3v-1.5H1.75a.75.75 0 0 1 0-1.5H3v-1.5H1.75a.75.75 0 0 1 0-1.5H3v-.5A2.75 2.75 0 0 1 5.75 3h.5V1.75a.75.75 0 0 1 1.5 0V3h1.5ZM4.5 5.75c0-.69.56-1.25 1.25-1.25h8.5c.69 0 1.25.56 1.25 1.25v8.5c0 .69-.56 1.25-1.25 1.25h-8.5c-.69 0-1.25-.56-1.25-1.25v-8.5Z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm">Flight Booking</p>
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold text-white/90">
            Pay for flights with your bank account
          </h2>
          <p className="max-w-[600px] text-neutral-400 font-medium md:text-base/relaxed lg:text-base/relaxed xl:text-base/relaxed ">
            Secure your flight reservations directly via the Swift Nexus
            platform and conveniently settle payments using your bank account.
            This streamlined process eliminates the need for credit cards or
            external payment services, ensuring a smoother transaction
            experience.
          </p>
          <div className="flex mt-8 gap-x-2 items-center">
            {" "}
            <Link
              href="/dashboard"
              className=" bg-base-color/80 hover:bg-base-color/80 transition-all flex px-6 py-4 rounded-full font-bold text-white/90  items-center gap-3 cursor-pointer"
            >
              <p>Book a Flight</p>{" "}
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
            <Link
              href={"/auth/login"}
              className=" bg-neutral-50/20 hidden hover:bg-neutral-100/20 transition-all lg:flex px-6 py-4 rounded-full font-bold text-white/90  items-center gap-3 cursor-pointer "
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
      </div>
    </section>
  );
}
