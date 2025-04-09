import React from "react";
import ImageJuggler from "./ImageJuggler";
import Link from "next/link";
import Image from "next/image";
import mastercard from "@/public/assets/cards/card_types/mastercard.png";
import visa from "@/public/assets/cards/card_types/visa.png";
import discover from "@/public/assets/cards/card_types/discover.png";

export default function CardPage() {
  return (
    <div>
      <div className="px-10 md:px-20 h-full w-full savings_cont grid md:grid-cols-2 grid-cols-1 gap-x-10 mb-9 md:items-center /bg-neutral-400/10 py-10 overflow-hidden/ relative">
        <div className="absolute -left-16 z-40 -top-0 animate-pulse/ duration-1000 text-neutral-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            strokeWidth={0.7}
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-40"
          >
            <path
              fillRule="evenodd"
              d="M11.622 1.602a.75.75 0 0 1 .756 0l2.25 1.313a.75.75 0 0 1-.756 1.295L12 3.118 10.128 4.21a.75.75 0 1 1-.756-1.295l2.25-1.313ZM5.898 5.81a.75.75 0 0 1-.27 1.025l-1.14.665 1.14.665a.75.75 0 1 1-.756 1.295L3.75 8.806v.944a.75.75 0 0 1-1.5 0V7.5a.75.75 0 0 1 .372-.648l2.25-1.312a.75.75 0 0 1 1.026.27Zm12.204 0a.75.75 0 0 1 1.026-.27l2.25 1.312a.75.75 0 0 1 .372.648v2.25a.75.75 0 0 1-1.5 0v-.944l-1.122.654a.75.75 0 1 1-.756-1.295l1.14-.665-1.14-.665a.75.75 0 0 1-.27-1.025Zm-9 5.25a.75.75 0 0 1 1.026-.27L12 11.882l1.872-1.092a.75.75 0 1 1 .756 1.295l-1.878 1.096V15a.75.75 0 0 1-1.5 0v-1.82l-1.878-1.095a.75.75 0 0 1-.27-1.025ZM3 13.5a.75.75 0 0 1 .75.75v1.82l1.878 1.095a.75.75 0 1 1-.756 1.295l-2.25-1.312a.75.75 0 0 1-.372-.648v-2.25A.75.75 0 0 1 3 13.5Zm18 0a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.372.648l-2.25 1.312a.75.75 0 1 1-.756-1.295l1.878-1.096V14.25a.75.75 0 0 1 .75-.75Zm-9 5.25a.75.75 0 0 1 .75.75v.944l1.122-.654a.75.75 0 1 1 .756 1.295l-2.25 1.313a.75.75 0 0 1-.756 0l-2.25-1.313a.75.75 0 1 1 .756-1.295l1.122.654V19.5a.75.75 0 0 1 .75-.75Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="absolute -right-12 bottom-0 md:bottom-12 text-neutral-100">
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
              d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z"
            />
          </svg>
        </div>
        <div className="text-cont z-20 lg:pr-10">
          <div className="flex items-center gap-x-3">
            <div className="register  bg-neutral-50 text-xs text-neutral-600 py-2 px-3 rounded-md font-semibold flex items-center gap-2 cursor-pointer hover:bg-[#]">
              <Image
                src={mastercard}
                width={1000}
                height={1000}
                className="h-5 w-auto"
                alt=""
              />

              <p>Mastercard</p>
            </div>
            <div className="register bg-neutral-50 text-xs text-neutral-600 py-2 px-3 rounded-md font-semibold flex items-center gap-2 cursor-pointer hover:bg-[#]">
              <Image
                src={visa}
                width={1000}
                height={1000}
                className="h-5 w-auto"
                alt=""
              />

              <p>Visa</p>
            </div>
            <div className="register  bg-neutral-50 text-xs text-neutral-600 py-2 px-3 rounded-md font-semibold flex items-center gap-2 cursor-pointer hover:bg-[#]">
              <Image
                src={discover}
                width={1000}
                height={1000}
                className="h-5 w-auto"
                alt=""
              />

              <p>Discover</p>
            </div>
          </div>
          <div className="large-text text-3xl md:text-5xl  mt-5 font-semibold text-neutral-700">
            Explore Credit Card Options
          </div>
          <div className="small-text text-base lg:text-lg mt-5 font-medium text-neutral-500 md:text-balance">
            Discover the best credit card options at{" "}
            <span className="font-semibold">Swift Nexus</span>, tailored to
            maximize your purchasing power and financial flexibility. Benefit
            from our expert advice and exclusive rewards as you manage your
            spending efficiently.
          </div>

          <div className="flex mt-5 md:mt-8 gap-x-2 text-sm md:justify-start">
            {" "}
            <Link
              href={"/auth/login"}
              className=" bg-base-color/80 px-6 py-4 rounded-full font-bold text-white flex items-center gap-3 cursor-pointer hover:bg-[#]"
            >
              <p>Get a card</p>
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

        <div className="mt-5 size-full mt:mt-0 order-first ">
          {" "}
          <ImageJuggler />
        </div>
      </div>
    </div>
  );
}
