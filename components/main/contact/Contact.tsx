"use client";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import heroImg from "@/public/assets/bankImage.jpg";

import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { useColors } from "@/context/colorContext";
import Image from "next/image";

export default function Contact() {
  const colors = useColors();
  return (
    <section className="w-full py-12 md:py-24 lg:px-24 lg:py-32 relative">
      <div className="w-full h-full absolute top-0 z-0 left-0">
        <Image
          alt=""
          src={heroImg}
          className=" h-full w-full object-cover"
          width={1000}
          height={1000}
        />
      </div>

      <div className="container grid gap-12 relative z-40 px-4 md:px-6 lg:grid-cols-2 lg:gap-24">
        <div className="space-y-6">
          <div className="text-cont md:mt-4 /shadow-md p-5 rounded-xl /border">
            <div className="socila">
              <div className="intText mt-3 font-semibold">
                Follow our socials
              </div>
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
            <div className="contacts   mt-7">
              <div className="intText mt-3 font-semibold">Reach out to us</div>
              <div className="email bg-[#ffffffa4] backdrop-filter backdrop-blur-md flex items-center gap-x-4 mt-3 border border-blue-700/20 rounded-xl p-3">
                <div
                  className="p-3 rounded-xl"
                  style={{
                    background: colors.defaultblue + "10",
                    color: colors.defaultblue,
                  }}
                >
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

                <div className="email-address bg-[#ffffffa4] backdrop-filter backdrop-blur-md">
                  <div className="first font-semibold text-sm text-neutral-600">
                    Email
                  </div>
                  <div className="second  text-neutral-800 text-sm">
                    Support@swiftnexusbn.us
                  </div>
                </div>
              </div>{" "}
              <div className="phone bg-[#ffffffa4] backdrop-filter backdrop-blur-md flex items-center gap-x-4 mt-5 border border-blue-700/20 rounded-xl p-3">
                <div
                  className="p-3 rounded-xl bg-green-100 text-green-600"
                  style={{
                    background: colors.defaultblue + "10",
                    color: colors.defaultblue,
                  }}
                >
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
                  <div className="second font-sans text-neutral-800 text-sm">
                    +1 (254) 5477
                  </div>
                </div>
              </div>
              <div className="phone bg-[#ffffffa4] backdrop-filter backdrop-blur-md flex items-center gap-x-4 mt-5 border border-blue-700/20 rounded-xl p-3">
                <div
                  className="p-3 rounded-xl bg-cyan-100 text-cyan-600"
                  style={{
                    background: colors.defaultblue + "10",
                    color: colors.defaultblue,
                  }}
                >
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

                <div className="phone  ">
                  <div className="first font-semibold text-sm text-neutral-600">
                    Address
                  </div>
                  <div className="second font-sans text-neutral-800 text-sm">
                    11128 SE Stanley Ave, Milwaukie, OR 97222
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Card className="bg-[#ffffffa4] backdrop-filter backdrop-blur-lg">
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
              <CardDescription>
                {
                  "Fill out the form below and we'll get back to you as soon as possible."
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input id="first-name" placeholder="Enter your first name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input id="last-name" placeholder="Enter your last name" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Enter your email" type="email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="Enter your phone number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Enter your message"
                  className="min-h-[100px] bg-[#ffffffa2] backdrop-filter backdrop-blur-lg"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full font-bold h-12"
                style={{ background: colors.defaultblue }}
              >
                Submit
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
