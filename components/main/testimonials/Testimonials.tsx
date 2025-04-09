import { InfiniteMovingCards } from "@/components/ui/infiniteMovingCards";
import React from "react";
import LottieLoader from "./LottieLoader";
import Link from "next/link";

export default function Testimonials() {
  type testimonialsType = {
    name: string;
    title: string;
    desc: string;
    imagePath: string;
  }[];

  const testimonialsData: testimonialsType = [
    {
      name: "Sarah McGregor",
      title: "Product Designer",
      desc: "I have been banking with Wilson Investment Bank & Co. for years, and their service consistently exceeds my expectations. Their online platform is intuitive and user-friendly, allowing me to manage my accounts effortlessly from anywhere. Additionally, their customer support team is always responsive and helpful, addressing any inquiries promptly. Highly recommend!",
      imagePath: "/assets/testimonials_avatar/sarah.png",
    },
    {
      name: "Mark Hollow",
      title: "Marketing Agency",
      desc: "As a small business owner, Wilson Investment Bank & Co. has been indispensable in ensuring smooth financial operations. Their tailored solutions and personalized service have been crucial for managing my finances and fostering business growth. I cannot imagine banking with any other institution.",
      imagePath: "/assets/testimonials_avatar/dup.png",
    },
    {
      name: "The Johnson's Family",
      title: "Oilux Corporation",
      desc: "Planning our family vacation was seamless with Wilson Investment Bank & Co. Their knowledgeable agents assisted us in selecting the perfect destination and managed all the details, from booking flights to arranging accommodations. Thanks to Wilson Investment Bank & Co., we enjoyed an unforgettable trip.",
      imagePath: "/assets/testimonials_avatar/johnsons.png",
    },
    {
      name: "David Richard",
      title: "BreachX Headstaff",
      desc: "I have always felt secure banking with Wilson Investment Bank & Co. Their dedication to privacy and security provides peace of mind, knowing that my financial information is protected. Additionally, their user-friendly website and mobile app simplify account management. Highly recommend!",
      imagePath: "/assets/testimonials_avatar/dup.png",
    },
    {
      name: "Jennifer Sanders",
      title: "Sales Manager",
      desc: "I have been a loyal customer of Wilson Investment Bank & Co. for approximately three years, and their commitment to customer satisfaction continually impresses me. Whether assisting with complex financial decisions or providing timely support, Wilson Investment Bank & Co. consistently goes above and beyond. Exceptional service!",
      imagePath: "/assets/testimonials_avatar/jennifer.png",
    },
    {
      name: "Alex Thibaut",
      title: "Stage Equalizer",
      desc: "Planning our company’s annual conference was efficient and straightforward with Wilson Investment Bank & Co. Their team managed everything from booking venues to coordinating logistics with professionalism and meticulous attention to detail. Our event was a resounding success, thanks to their expertise!",
      imagePath: "/assets/testimonials_avatar/alex.png",
    },
  ];

  return (
    <div>
      <div className="px-10 md:px-20 savings_cont grid md:grid-cols-2 grid-cols-1 mt-8 items-center">
        <div className="text-cont">
          <div className="flex items-center gap-x-3">
            <div className="register py-2 px-3 bg-base-color/5 text-base-color/80 rounded-full font-semibold flex items-center text-xs gap-2 cursor-pointer hover:bg-[#]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="size-4"
              >
                <path d="M1 8.849c0 1 .738 1.851 1.734 1.947L3 10.82v2.429a.75.75 0 0 0 1.28.53l1.82-1.82A3.484 3.484 0 0 1 5.5 10V9A3.5 3.5 0 0 1 9 5.5h4V4.151c0-1-.739-1.851-1.734-1.947a44.539 44.539 0 0 0-8.532 0C1.738 2.3 1 3.151 1 4.151V8.85Z" />
                <path d="M7 9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-.25v1.25a.75.75 0 0 1-1.28.53L9.69 12H9a2 2 0 0 1-2-2V9Z" />
              </svg>

              <p>Testimonials</p>
            </div>
            {/* <div className="register bg-green-700/10 text-xs text-green-500 p-2 rounded-full font-bold flex items-center gap-2 cursor-pointer hover:bg-[#]">
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
          </div> */}
          </div>
          <div className="large-text text-3xl md:text-5xl mt-3 font-semibold text-neutral-700">
            What people are saying about us
          </div>
          <div className="small-text text-base mt-3 font-medium text-neutral-500 text-balance">
            Discover why our clients trust Swift Nexus for unparalleled
            savings and investment opportunities. Our commitment to your
            financial growth and security, coupled with expert guidance and
            comprehensive solutions, sets us apart.
          </div>
          <div className="flex mt-5 text-sm lg:justify-start">
            {" "}
            <Link
              href={"auth/login"}
              className="  px-6 py-4 rounded-full font-bold bg-base-color/80 text-white  flex items-center gap-3 cursor-pointer hover:bg-[#]"
            >
              <p>Create an account</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 hidden md:block"
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
        <div className="relative hidden md:block">
          {" "}
          <LottieLoader />
        </div>
      </div>
      <div className="mt-3 /px-10 h-64 py-4">
        <InfiniteMovingCards
          items={testimonialsData}
          direction="left"
          speed="slow"
        />
      </div>
    </div>
  );
}
