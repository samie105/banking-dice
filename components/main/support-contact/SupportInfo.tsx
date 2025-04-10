"use client";
import { useColors } from "@/context/colorContext";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function SupportInfo() {
  const colors = useColors();
  return (
    <div className="text-cont md:mt-4 /shadow-md p-5 rounded-xl /border">
      <div className="socila">
        <div className="intText mt-3 font-semibold">Follow our socials</div>
        <div className="socials my-2 text-lg flex items-center gap-x-5">
          <div className="ig bg-[#fd1d1d14] border-[#fd1d1d2e] border rounded-xl p-4 flex items-center justify-center">
            <FontAwesomeIcon
              icon={faInstagram}
              className=" text-[#fd1d1d] w-5 h-5"
            />
          </div>
          <div className="fb bg-blue-50 rounded-xl p-4 flex items-center justify-center border-blue-600/20 border">
            <FontAwesomeIcon
              icon={faFacebook}
              className=" text-blue-600 w-5 h-5 "
            />
          </div>
          <div className="twitter bg-cyan-50 rounded-xl p-4 flex items-center justify-center border-cyan-600/20 border">
            <FontAwesomeIcon
              icon={faTwitter}
              className=" text-cyan-600 w-5 h-5"
            />
          </div>
        </div>
      </div>
      <div className="contacts  mt-7">
        <div className="intText mt-3 font-semibold">Reach out to us</div>
        <div className="email flex items-center gap-x-4 mt-3 bg-neutral-50 rounded-xl p-3">
          <div className="p-3 rounded-xl bg-base-color/5 text-base-color/80">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="size-5"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
          </div>

          <div className="email-address">
            <div className="first font-semibold text-sm text-neutral-600">
              Email
            </div>
            <div className="second  text-neutral-500 font-medium text-sm">
              Support@swiftnexusbn.us
            </div>
          </div>
        </div>{" "}
        <div className="phone flex items-center gap-x-4 mt-3 bg-neutral-50 rounded-xl p-3">
          <div className="p-3 rounded-xl bg-base-color/5 text-base-color/80">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="size-5"
            >
              <path
                fillRule="evenodd"
                d="m3.855 7.286 1.067-.534a1 1 0 0 0 .542-1.046l-.44-2.858A1 1 0 0 0 4.036 2H3a1 1 0 0 0-1 1v2c0 .709.082 1.4.238 2.062a9.012 9.012 0 0 0 6.7 6.7A9.024 9.024 0 0 0 11 14h2a1 1 0 0 0 1-1v-1.036a1 1 0 0 0-.848-.988l-2.858-.44a1 1 0 0 0-1.046.542l-.534 1.067a7.52 7.52 0 0 1-4.86-4.859Z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <div className="phone ">
            <div className="first font-semibold text-sm text-neutral-600">
              Hotline
            </div>
            <div className="second font-sans text-neutral-500 font-medium text-sm">
              +1(678)7192288
            </div>
          </div>
        </div>
        <div className="add flex items-center gap-x-4 mt-3 bg-neutral-50 rounded-xl p-3">
          <div className="p-3 rounded-xl bg-base-color/5 text-base-color/80">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5"
            >
              <path
                fillRule="evenodd"
                d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <div className="phone ">
            <div className="first font-semibold text-sm text-neutral-600">
              Address
            </div>
            <div className="second font-sans text-neutral-500 font-medium text-sm">
              9101 SE Clinton ST Portland OR 97266-1439
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
