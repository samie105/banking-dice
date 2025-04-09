"use client";
import { Card, CardContent } from "@/components/ui/card";
import Cards, { Focused } from "react-credit-cards-2";
import { format } from "date-fns";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import React, { MouseEvent, useEffect, useState } from "react";
import { useColors } from "@/context/colorContext";
import { Inter } from "next/font/google";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createCard, DeleteCard } from "@/server/dashboard/cardActions";
import { useAction } from "next-safe-action/hooks";
import { useFetchInfo } from "@/lib/data/fetchPost";
import Link from "next/link";
import StatusIndicator from "./StatusIndicator";
const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export default function Dashboard() {
  const { data: deets } = useFetchInfo();
  const data = deets!.data;
  const colors = useColors();
  let toastId: any;
  const [state, setState] = useState<{
    number: string;
    expiry: string;
    cvc: string;
    name: string;
    focus: Focused;
  }>({
    number: data.card.cardNumber,
    // number: "",
    expiry: "",
    cvc: "",
    name: ``,
    focus: "",
  });
  const showCvc = (e: MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;
    setState((prev) => ({
      ...prev,
      focus: state.focus === name ? "" : (name as Focused),
    }));
  };
  const cardDeet = {
    name: data.firstName + " " + data.lastName,
    number: data.card.cardNumber,
    expiry: data.card.cardExpiry,
    cvc: data.card.cardCVC,
  };
  const { execute, status } = useAction(DeleteCard, {
    onSuccess({ data }) {
      toast.success(data?.message, {
        id: toastId,
        duration: 3000,
      });
      setState((prev) => {
        return {
          ...prev,
          number: "",
          expiry: "",
          cvc: "",
        };
      });
      toast.dismiss(toastId);
    },

    onExecute() {
      toast.loading("Please wait, Deleting card", {
        id: toastId,
      });
    },

    onError(error) {
      if (error.error.fetchError)
        toast.error("Error communicating with providers", {
          id: toastId,
        });
      if (error.error.serverError)
        toast.error("Error connecting to servers", {
          id: toastId,
        });
      if (error.error.validationErrors)
        toast.error("Error deleting card", {
          id: toastId,
        });

      toast.dismiss(toastId);
    },
  });
  const handleCardDeletion = async () => {
    execute({ action: "delete card" });
  };
  return (
    <>
      {/* <div className="account-info mb-1 bg-white p-2 rounded-sm md:hidden">
        <Link
          href={"/dashboard/settings"}
          className="account-section transition-all cursor-pointer hover:bg-[#0013BB0/9] p-2 rounded-md flex /pl-1 items-center space-x-2 justify-between"
        >
          <div className="flex items-center space-x-2">
            <Avatar>
              {<AvatarImage  src={data.profilePictureLink} />}
              <AvatarFallback className="font-bold bo/rder border-base-color/30 text-sm text-base-color/80 bg/-base-color/5">
                {data.firstName.charAt(0).toUpperCase()}
                {data.lastName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="pl-1">
              {" "}
              <div className="name  text-sm text-neutral-700 font-semibold">
                <span className="font-medium">Hello, </span>
                {data.lastName}
              </div>
              <div
                className={`account-type capitalize mt-0.5 text-xs font-medium text-neutral-500`}
              >
                {data.accountType} |{" "}
                <code className={` ${inter.className} font-normal text-xs`}>
                  **
                  {data.bankAccountNumber.substring(
                    data.bankAccountNumber.length - 4
                  )}
                </code>
              </div>
            </div>
          </div>
          <div className="veification-status  pl-3 font-medium text-sm">
            <div
              className={`badge bg-red-50/60 border border-red-50 px-2 py-1.5 text-xs rounded-md font-semibold text-red-500 flex items-center space-x-1`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-4"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                  clipRule="evenodd"
                />
              </svg>

              <p className="">Not Verified</p>
            </div>
          </div>
        </Link>
      </div> */}
      <div className="space-y-2">
        <section className="dashboard_card-section /gap-y-1 mt-0.5 items-center gap-x-1 grid md:grid-cols-2 grid-cols-1">
          <div className="dashboard">
            <div className="card ">
              <Card>
                <CardContent className="py-5 rounded-sm bg-gradient-to-br from-blue-800 via-blue-800 to-blue-800 ">
                  <div className="flex items-center justify-between">
                    {" "}
                    <div className="">
                      <div className="account-type text-xs bg-white/5 border border-white/10 p-1.5 rounded-sm font-medium text-neutral-300">
                        <span className="capitalize">{data.accountType}</span>{" "}
                        account
                      </div>
                      <div
                        className={`account-balance text-3xl mt-2 /blur-md font-bold text-neutral-100 ${inter.className}`}
                      >
                        <span className="text-sm">$</span>
                        {data.accountBalance.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </div>
                    </div>
                    <div className="actions hidden flex/ items-center space-x-2">
                      <div className="deposit-action rounded-md bg-white/5 borde/r border-white/10 p-3 text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="size-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.5 17a4.5 4.5 0 0 1-1.44-8.765 4.5 4.5 0 0 1 8.302-3.046 3.5 3.5 0 0 1 4.504 4.272A4 4 0 0 1 15 17H5.5Zm3.75-2.75a.75.75 0 0 0 1.5 0V9.66l1.95 2.1a.75.75 0 1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0l-3.25 3.5a.75.75 0 1 0 1.1 1.02l1.95-2.1v4.59Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="transfer-action rounded-md bg-white/5 bord/er border-white/10 p-3 text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="size-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M13.75 7h-3V3.66l1.95 2.1a.75.75 0 1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0L6.2 4.74a.75.75 0 0 0 1.1 1.02l1.95-2.1V7h-3A2.25 2.25 0 0 0 4 9.25v7.5A2.25 2.25 0 0 0 6.25 19h7.5A2.25 2.25 0 0 0 16 16.75v-7.5A2.25 2.25 0 0 0 13.75 7Zm-3 0h-1.5v5.25a.75.75 0 0 0 1.5 0V7Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-x-2 mt-5">
                    <Link
                      href={"/dashboard/deposit"}
                      className="bg-white/5 text-white text-sm rounded-md border font-semibold border-white/10 flex items-center  space-x-2 px-3 py-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="size-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.5 17a4.5 4.5 0 0 1-1.44-8.765 4.5 4.5 0 0 1 8.302-3.046 3.5 3.5 0 0 1 4.504 4.272A4 4 0 0 1 15 17H5.5Zm3.75-2.75a.75.75 0 0 0 1.5 0V9.66l1.95 2.1a.75.75 0 1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0l-3.25 3.5a.75.75 0 1 0 1.1 1.02l1.95-2.1v4.59Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p>Deposit</p>
                    </Link>
                    <Link
                      href={"/dashboard/transfers"}
                      className="bg-white/5 text-white text-sm rounded-md border font-semibold border-white/10 flex items-center  space-x-2 px-3 py-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="size-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M13.75 7h-3V3.66l1.95 2.1a.75.75 0 1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0L6.2 4.74a.75.75 0 0 0 1.1 1.02l1.95-2.1V7h-3A2.25 2.25 0 0 0 4 9.25v7.5A2.25 2.25 0 0 0 6.25 19h7.5A2.25 2.25 0 0 0 16 16.75v-7.5A2.25 2.25 0 0 0 13.75 7Zm-3 0h-1.5v5.25a.75.75 0 0 0 1.5 0V7Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p>Transfers</p>
                    </Link>
                  </div>
                  <div className="separator w-20 h-0.5 mt-4 bg-white/10 mx-auto"></div>

                  <div className="acount-info">
                    <h1 className="text-neutral-300 font-medium text-sm mt-5">
                      Account Info
                    </h1>
                    <div className="account-limit-info mt-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-x-2">
                          <div className="icon-cont rounded-full relative justify-center items-center flex bg-white/5 border text-white border-white/10 p-3 ">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="size-4"
                            >
                              <path
                                fillRule="evenodd"
                                d="M13.2 2.24a.75.75 0 0 0 .04 1.06l2.1 1.95H6.75a.75.75 0 0 0 0 1.5h8.59l-2.1 1.95a.75.75 0 1 0 1.02 1.1l3.5-3.25a.75.75 0 0 0 0-1.1l-3.5-3.25a.75.75 0 0 0-1.06.04Zm-6.4 8a.75.75 0 0 0-1.06-.04l-3.5 3.25a.75.75 0 0 0 0 1.1l3.5 3.25a.75.75 0 1 0 1.02-1.1l-2.1-1.95h8.59a.75.75 0 0 0 0-1.5H4.66l2.1-1.95a.75.75 0 0 0 .04-1.06Z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <div className="liner absolute h-7 w-[1px] bg-white/10 z-0 -bottom-7"></div>
                          </div>
                          <div className="account-limit text-neutral-200/80 font-semibold text-sm">
                            <div>Account limit</div>
                            <div className="amount text-neutral-200 font-semibold /text-base">
                              <p className={`${inter.className}`}>
                                ${data.accountLimit.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                        {/* <div
                        className={`text-red-500 text-sm font-semibold ${inter.className}`}
                      >
                        ~ $4000
                      </div> */}
                      </div>
                    </div>
                    <div className="separator w-5 h-0.5 my-1 bg-white/10 mx-auto"></div>

                    <div className="account-limit-info mt-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-x-2">
                          <div className="icon-cont rounded-full bg-white/5 border text-white border-white/10 p-3 ">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="size-4"
                            >
                              <path
                                fillRule="evenodd"
                                d="M13.2 2.24a.75.75 0 0 0 .04 1.06l2.1 1.95H6.75a.75.75 0 0 0 0 1.5h8.59l-2.1 1.95a.75.75 0 1 0 1.02 1.1l3.5-3.25a.75.75 0 0 0 0-1.1l-3.5-3.25a.75.75 0 0 0-1.06.04Zm-6.4 8a.75.75 0 0 0-1.06-.04l-3.5 3.25a.75.75 0 0 0 0 1.1l3.5 3.25a.75.75 0 1 0 1.02-1.1l-2.1-1.95h8.59a.75.75 0 0 0 0-1.5H4.66l2.1-1.95a.75.75 0 0 0 .04-1.06Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div className="account-dep-ver text-neutral-200/80 font-semibold text-sm">
                            <div>Opening deposit</div>
                            <div className="amount text-neutral-200 font-semibold /text-base">
                              <p className={`${inter.className}`}>$550</p>
                            </div>
                          </div>
                        </div>
                        <StatusIndicator data={data} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <Card
            className={`card b/order relative shadow-none h-full bg-white dark:bg-neutral-900 m-0 border-none rounded-md md:p-3 pt-2 md:pt-0 /border w-full min-h-48 pb-3 md:pb:0 /border-dashed border-neutral-600 `}
          >
            {data.card.cardNumber === "" && (
              <div className="image-cont absolute w-full h-full animate-spi top-0 left-0">
                <Image
                  alt=""
                  className=" dark:hidden"
                  src={"/assets/cards/no_card_bg.svg"}
                  fill
                />
                <Image
                  alt=""
                  className=" hidden dark:block"
                  src={"/assets/cards/no_card_bg_white.svg"}
                  fill
                />
              </div>
            )}
            {data.card.cardNumber !== "" && (
              <div>
                {" "}
                <div className="w-full md:pt-4 relative">
                  {" "}
                  <Cards
                    number={data.card.cardNumber || ""}
                    expiry={data.card.cardExpiry || ""}
                    cvc={data.card.cardCVC || ""}
                    name={data.firstName + " " + data.lastName || ""}
                    focused={state.focus}
                  />
                  {state.focus === "" && (
                    <div className="absolute animate__animated animate__lightSpeedInRight bankName uppercase bottom-2 left-[60px] text-sm text-neutral-300 font-medium">
                      <code>Swift Nexus</code>
                    </div>
                  )}{" "}
                </div>
                <div className="separator w-20 h-0.5 mt-4 mb-2 bg-black/10 mx-auto"></div>
                <div className="card-actions /mt-1 cont px-1 md:px-3">
                  <div className="flex justify-between items-center /shadow-sm w-full rounded-md px-3 /pt-2">
                    <div
                      className="card-balance space-y-1 /px-4 py-1 rounded-md"
                      // style={{ background: colors.defaultblue + "09" }}
                    >
                      <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                        Card balance
                      </div>
                      <div
                        className={`text-xl font-bold text-neutral-700 dark:text-neutral-300 ${inter.className}`}
                      >
                        $
                        {data.cardBalance.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </div>
                    </div>

                    <div className="actions flex items-center gap-x-2">
                      <div className="topup cursor-pointer rounded-md b/order bg-[#0013BB06] text-base-color/80 dark:text-blue-500 dark:bg-blue-500/10 border-black/10 p-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="size-5"
                        >
                          <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                        </svg>
                      </div>
                      <CreditCardDetails
                        status={status}
                        state={cardDeet}
                        cardInfo={data.card}
                      />
                      <button
                        disabled={status === "executing"}
                        name="cvc"
                        onClick={showCvc}
                        className="showcvc disabled:opacity-25 cursor-pointer rounded-md b/order bg-base-color/5 dark:bg-blue-500/10 dark:text-blue-500 text-base-color/80 border-black/10 p-3"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="size-5"
                        >
                          <path d="M4.25 2A2.25 2.25 0 0 0 2 4.25v2a.75.75 0 0 0 1.5 0v-2a.75.75 0 0 1 .75-.75h2a.75.75 0 0 0 0-1.5h-2ZM13.75 2a.75.75 0 0 0 0 1.5h2a.75.75 0 0 1 .75.75v2a.75.75 0 0 0 1.5 0v-2A2.25 2.25 0 0 0 15.75 2h-2ZM3.5 13.75a.75.75 0 0 0-1.5 0v2A2.25 2.25 0 0 0 4.25 18h2a.75.75 0 0 0 0-1.5h-2a.75.75 0 0 1-.75-.75v-2ZM18 13.75a.75.75 0 0 0-1.5 0v2a.75.75 0 0 1-.75.75h-2a.75.75 0 0 0 0 1.5h2A2.25 2.25 0 0 0 18 15.75v-2ZM7 10a3 3 0 1 1 6 0 3 3 0 0 1-6 0Z" />
                        </svg>
                      </button>
                      <Dialog>
                        <DialogTrigger
                          disabled={status === "executing"}
                          className="disabled:opacity-25"
                        >
                          <div className="deleteCard cursor-pointer rounded-md b/order text-red-600 dark:bg-red-500/10 dark:disabled:bg-neutral-600 dark:disabled:text-neutral-300 disabled:bg-neutral-100 disabled:text-neutral-500 disabled:cursor-pointer border-red-600/10 bg-red-600/10 p-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="size-5"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </DialogTrigger>
                        <DialogContent className="w-[90%] dark:bg-neutral-900">
                          <DialogTitle className="text-neutral-600 dark:text-neutral-300">
                            Delete Credit Card
                          </DialogTitle>
                          <DialogDescription className="text-neutral-600 dark:text-neutral-400">
                            Please note that this action is irreversible, please
                            review and be sure of this action
                          </DialogDescription>

                          <div className="actions flex justify-between items-center">
                            <DialogClose className="py-3 px-5 rounded-sm cursor-pointer border bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-600 text-neutral-600">
                              <div className="cancel font-semibold ">
                                Cancel
                              </div>
                            </DialogClose>
                            <DialogClose
                              onClick={handleCardDeletion}
                              className="p-3 rounded-sm cursor-pointer flex items-center space-x-2 bg-red-600 text-white font-semibold"
                            >
                              <p>Delete card</p>{" "}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="size-4"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </DialogClose>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {data.card.cardNumber === "" && (
              <>
                <div className="flex /border items-center justify-center w-md min-h-80 md:h-full  rounded-md ">
                  <div className="space-y-2 b/order p-4 bg-[#ffffff6a] dark:bg-neutral-900/80 dark:bg-none backdrop-filter backdrop-blur-sm rounded-md text-center">
                    {" "}
                    <CreateCardForm setState={setState} />
                  </div>
                </div>
              </>
            )}
          </Card>
        </section>
      </div>
    </>
  );
}
type CreateCardFormProps = {
  setState: React.Dispatch<
    React.SetStateAction<{
      number: string;
      expiry: string;
      cvc: string;
      name: string;
      focus: Focused;
    }>
  >;
};
export function CreateCardForm({ setState }: CreateCardFormProps) {
  const cardProviders = [
    {
      name: "Mastercard",
      imagePath: "/assets/cards/card_types/mastercard.png",
      initials: "MC",
    },
    {
      name: "Visa",
      imagePath: "/assets/cards/card_types/visa.jpg",
      initials: "V",
    },
    {
      name: "American Express",
      imagePath: "/assets/cards/card_types/amex.png",
      initials: "AMEX",
    },
    {
      name: "Discover",
      imagePath: "/assets/cards/card_types/discover.png",
      initials: "D",
    },
    {
      name: "Diners Club",
      imagePath: "/assets/cards/card_types/dinerclub.png",
      initials: "DC",
    },
  ];
  const addressRegex = new RegExp(
    "^\\s*\\d+([a-z]?\\s)?[a-z0-9\\s\\-',]+(?:\\s*(?:street|avenue|road|lane|drive|blvd|way|circle|court|plaza|terrace|place|pkwy|hwy|\\p{L}+))?,\\s*[a-z0-9\\s\\-',]+,\\s*[a-z0-9\\s\\-',]+\\s*$",
    "iu"
  );
  let toastId: any;
  const [cardType, setCardType] = useState("");
  const [cardBillingAddress, setcardBillingAddress] = useState("");
  const [cardBillingAddressError, setcardBillingAddressError] = useState("");
  const [cardZipCode, setcardZipCode] = useState("");
  const [cardZipCodeError, setcardZipCodeError] = useState("");
  const isFormValid =
    !(cardType === "" || cardBillingAddress === "" || cardZipCode === "") &&
    cardZipCode.length >= 5;
  const handlecardZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setcardZipCode(value);
    if (value.length! < 5) {
      setcardZipCodeError("Zip code must be 5 digits or higher");
    } else {
      setcardZipCodeError("");
    }
  };
  const handlecardBillingAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const address = e.target.value;
    if (!addressRegex.test(address)) {
      setcardBillingAddressError("Invalid address format");
    } else {
      setcardBillingAddressError("");
    }
    setcardBillingAddress(address);
  };
  function generateCardNumber(cardType: string): string {
    const providers: { [key: string]: number[] } = {
      Mastercard: [51, 52, 53, 54, 55],
      Visa: [4],
      "American Express": [34, 37],
      Discover: [6011, 64, 65],
      "Diners Club": [300, 301, 302, 303, 36, 38],
    };

    if (providers.hasOwnProperty(cardType)) {
      const initialDigits: number[] =
        providers[cardType as keyof typeof providers];
      if (!initialDigits) {
        throw new Error(`Invalid card type: ${cardType}`);
      }

      const initialDigit =
        initialDigits[Math.floor(Math.random() * initialDigits.length)];
      let cardNumber = initialDigit.toString();

      // Generate remaining 11 digits
      for (let i = 0; i < 15; i++) {
        cardNumber += Math.floor(Math.random() * 10);
      }

      // If the generated card number is longer than 12 digits, remove the last digit
      if (cardNumber.length > 16) {
        cardNumber = cardNumber.slice(0, 16);
      }

      // If the generated card number is shorter than 12 digits, pad leading zeros
      if (cardNumber.length < 16) {
        cardNumber =
          "000000000000".slice(0, 16 - cardNumber.length) + cardNumber;
      }

      return cardNumber;
    } else {
      throw new Error(`Invalid card type: ${cardType}`);
    }
  }

  function generateExpiryDate(): string {
    const currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() + 2);
    const expiryDate = format(currentDate, "MM/yy");
    return expiryDate;
  }
  function generateCVC(): string {
    const cvc = Math.floor(1000 + Math.random() * 9000).toString();
    return cvc.slice(-3);
  }

  const { execute, status } = useAction(createCard, {
    onSuccess({ data }) {
      toast.success(data?.message, {
        id: toastId,
        duration: 3000,
      });
      setState((prev) => {
        return {
          ...prev,
          number: data?.data.cardNumber,
          expiry: data?.data.cardExpiry,
          cvc: data?.data.cardCVC,
        };
      });
      toast.dismiss(toastId);
    },

    onExecute() {
      toast.loading("Please wait, Creating card", {
        id: toastId,
      });
    },

    onError(error) {
      if (error.error.fetchError)
        toast.error("Error communicating with providers", {
          id: toastId,
        });
      if (error.error.serverError)
        toast.error("Error connecting to servers", {
          id: toastId,
        });
      if (error.error.validationErrors)
        toast.error("Error creating card", {
          id: toastId,
        });

      toast.dismiss(toastId);
    },
  });
  const handleCreateCard = () => {
    const cardNumber = generateCardNumber(cardType);
    const cardExpiry = generateExpiryDate();
    const cardCVC = generateCVC();

    execute({
      cardNumber,
      cardExpiry,
      cardCVC,
      cardType,
      cardBillingAddress,
      cardZipCode,
    });
  };
  return (
    <>
      {" "}
      <div className="icon text-neutral-500/  text-base-color/80 dark:text-blue-500 flex justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
          <path
            fillRule="evenodd"
            d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="text font-semibold text-neutral-800/ text-base-color/80 dark:text-blue-500">
        Get a{" "}
        <span className="text-base-color/80 dark:text-blue-500 font-bold">
          card
        </span>
      </div>
      <div className="text-sm dark:text-neutral-300 note font-medium text-balance ">
        Get a credit card for your day to day
        <br /> purchases from us
      </div>
      <Dialog>
        <DialogTrigger className="flex w-full justify-center">
          <div className="btn py-3 px-6 mt-3 text-sm font-bold flex justify-center items-center space-x-2 rounded-sm bg-base-color dark:bg-blue-600 text-white">
            <p>Order</p>{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="size-4"
            >
              <path
                fillRule="evenodd"
                d="M2 8c0 .414.336.75.75.75h8.69l-1.22 1.22a.75.75 0 1 0 1.06 1.06l2.5-2.5a.75.75 0 0 0 0-1.06l-2.5-2.5a.75.75 0 1 0-1.06 1.06l1.22 1.22H2.75A.75.75 0 0 0 2 8Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </DialogTrigger>
        <DialogContent className="rounded-md w-[90%] transition-all dark:border dark:border-neutral-800 dark:bg-neutral-900">
          <div className="text-base flex items-center gap-x-2 text-neutral-700/">
            <div className="font-semibold flex items-center gap-x-2 bg-[#0013BB08] dark:bg-blue-500/10 p-2 /inline rounded-sm dark:text-blue-500 text-base-color/90">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5"
              >
                <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
                <path
                  fillRule="evenodd"
                  d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z"
                  clipRule="evenodd"
                />
              </svg>{" "}
              <p>Get a Credit card</p>
            </div>
          </div>
          <DialogDescription className="text-sm fontme dark:text-neutral-300 text-neutral-500">
            Get a card for day to day activity, online purchases and any payment
            related activity
          </DialogDescription>
          <div className="card-display mt-1 flex justify-between items-center">
            {cardProviders.map((_) => (
              <div
                key={_.imagePath}
                className="size-12 flex items-center justify-center"
              >
                <Image
                  alt=""
                  width={100}
                  height={100}
                  src={_.imagePath}
                  className="aspect-auto"
                />
              </div>
            ))}
          </div>

          <div className="card-select mt-4">
            <div className="tt text-neutral-600 dark:text-neutral-400 font-medium text-sm">
              Select a provider
            </div>
            <Select onValueChange={(val) => setCardType(val)}>
              <SelectTrigger className="mt-2 dark:text-neutral-300 dark:bg-neutral-800 font-semibold items-center">
                <SelectValue
                  className="placeholder:text-neutral-300"
                  placeholder="Select a card provider"
                />
              </SelectTrigger>
              <SelectContent className="dark:bg-neutral-800">
                {cardProviders.map((_) => (
                  <SelectItem
                    key={_.initials}
                    value={_.name}
                    className="flex /w-full items-center /gap-x-2"
                  >
                    <div className="flex w-full items-center py-2 gap-x-2">
                      {" "}
                      <div className="flex items-center justify-center h-6 w-9">
                        <Image
                          src={_.imagePath}
                          height={1000}
                          width={1000}
                          alt=""
                          className="aspect-auto"
                        />
                      </div>
                      <div className="text-sm font-semibold dark:text-neutral-300 text-neutral-600 capitalize">
                        {_.name} ({_.initials})
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="billing-address-form">
            <div className="billing-form">
              <div className="tt text-neutral-600 dark:text-neutral-400 font-medium text-sm">
                Billing address
              </div>
              <Input
                type="text"
                value={cardBillingAddress}
                onChange={handlecardBillingAddressChange}
                className="mt-2 h/-11 placeholder:text-neutral-400 dark:bg-neutral-800"
                placeholder="Street address, city, state"
              />
            </div>
            {cardBillingAddressError && (
              <div className="bg-red-500/5 mt-3 p-2 border/ /border-red-500/20 rounded-sm text-red-500 animate__animated animate__fadeInUp animate__faster  font-medium/ text-sm">
                {cardBillingAddressError}
              </div>
            )}
          </div>
          <div className="zip-code">
            <div className="zip-code-form">
              <div className="tt text-neutral-600 dark:text-neutral-400 font-medium text-sm">
                Zip code
              </div>
              <Input
                type="number"
                maxLength={6}
                minLength={6}
                min={6}
                value={cardZipCode}
                onChange={handlecardZipCodeChange}
                max={6}
                className="mt-2 h/-11 placeholder:text-neutral-400"
                placeholder="XXXXXX"
              />
            </div>
            {cardZipCodeError && (
              <div className="bg-red-500/5 mt-3 p-2 rounded-sm animate__animated animate__fadeInUp animate__faster text-red-500 font-medium/ text-sm">
                {cardZipCodeError}
              </div>
            )}
          </div>
          <DialogClose className="zip-code mt-2">
            <Button
              onClick={handleCreateCard}
              disabled={!isFormValid || status === "executing"}
              className="text-white bg-base-color/90 dark:bg-blue-500 h-11 w-full"
            >
              Create card
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function CreditCardDetails({
  state,
  cardInfo,
  status,
}: {
  state: {
    name: string;
    number: string;
    expiry: string;
    cvc: string;
  };
  cardInfo: { cardBillingAddress: string; cardZipCode: string };
  status: string;
}) {
  const data = Object.entries(state);
  return (
    <>
      <Dialog>
        <DialogTrigger
          disabled={status === "executing"}
          className="disabled:opacity-25"
        >
          <div className="card-details cursor-pointer rounded-md /border dark:bg-blue-500/10 dark:text-blue-500 text-base-color/80 border-black/10 p-3 bg-base-color/5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5"
            >
              <path
                fillRule="evenodd"
                d="M2.5 4A1.5 1.5 0 0 0 1 5.5V6h18v-.5A1.5 1.5 0 0 0 17.5 4h-15ZM19 8.5H1v6A1.5 1.5 0 0 0 2.5 16h15a1.5 1.5 0 0 0 1.5-1.5v-6ZM3 13.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75Zm4.75-.75a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5h-3.5Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </DialogTrigger>
        <DialogContent className="w-[90%] dark:bg-neutral-900 dark:border-neutral-800">
          <DialogTitle className="tt text-lg text-neutral-700 font-medium">
            <div className="text-base flex items-center gap-x-2 text-neutral-700/">
              <div className="font-semibold flex items-center gap-x-2 bg-[#0013BB08] p-2 /inline rounded-sm dark:bg-blue-/10 dark:text-blue-500 text-base-color/90">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="size-5"
                >
                  <path d="M2 4.5A2.5 2.5 0 0 1 4.5 2h11a2.5 2.5 0 0 1 0 5h-11A2.5 2.5 0 0 1 2 4.5ZM2.75 9.083a.75.75 0 0 0 0 1.5h14.5a.75.75 0 0 0 0-1.5H2.75ZM2.75 12.663a.75.75 0 0 0 0 1.5h14.5a.75.75 0 0 0 0-1.5H2.75ZM2.75 16.25a.75.75 0 0 0 0 1.5h14.5a.75.75 0 1 0 0-1.5H2.75Z" />
                </svg>{" "}
                <p>Credit Information</p>
              </div>
            </div>
          </DialogTitle>
          <div className="separator w-20 h-0.5 mt-1 bg-black/10 mx-auto dark:bg-white/10"></div>

          <div className="space-y-1 mt-4">
            <div className="tt billing font-medium dark:text-neutral-400">
              Billing Info
            </div>
            {data.map((_) => (
              <div key={_[0]}>
                {_[0] != "focus" && (
                  <div className="flex bg-/neutral-50 rounded-md py-3 px-2 items-center justify-between">
                    <div>
                      <div className="capitalize text-neutral-500 dark:text-neutral-300 font-medium text-sm /font-semibold">
                        Card {_[0]}
                      </div>
                      <div
                        className={`${inter.className} text-neutral-600 dark:text-neutral-200 font-medium /text-sm  f/ont-light`}
                      >
                        {_[1]}
                      </div>
                    </div>
                    <div
                      onClick={() => {
                        navigator.clipboard.writeText(_[1]);
                        toast.success(
                          `Card ${_[0].toUpperCase()} copied`.toUpperCase()
                        );
                      }}
                      className="icon cursor-pointer dark:text-blue-500 hover:dark:bg-blue-500/10 hover:bg-base-color/10 transition-all bg-base-color/5 hover:text-base-color/80 text-base-color/50 p-2 rounded-sm"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="size-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M15.988 3.012A2.25 2.25 0 0 1 18 5.25v6.5A2.25 2.25 0 0 1 15.75 14H13.5V7A2.5 2.5 0 0 0 11 4.5H8.128a2.252 2.252 0 0 1 1.884-1.488A2.25 2.25 0 0 1 12.25 1h1.5a2.25 2.25 0 0 1 2.238 2.012ZM11.5 3.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v.25h-3v-.25Z"
                          clipRule="evenodd"
                        />
                        <path
                          fillRule="evenodd"
                          d="M2 7a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7Zm2 3.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Zm0 3.5a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="billing-address">
            <div className="tt text-neutral-500/ dark:text-neutral-400 font-medium">
              Billing Address
            </div>
            <div>
              <div className="flex bg-/neutral-50 rounded-md py-3 px-2 items-center justify-between">
                <div>
                  <div className="capitalize text-neutral-500 dark:text-neutral-300 font-medium text-sm /font-semibold">
                    Card Billing Address
                  </div>
                  <div
                    className={`${inter.className} text-neutral-600 dark:text-neutral-200 font-medium /text-sm  f/ont-light`}
                  >
                    {cardInfo.cardBillingAddress}
                  </div>
                </div>
                <div
                  onClick={() => {
                    navigator.clipboard.writeText(cardInfo.cardBillingAddress);
                    toast.success(`Card Billing Address copied`.toUpperCase());
                  }}
                  className="icon cursor-pointer hover:bg-base-color/10 transition-all dark:text-blue-500 hover:dark:bg-blue-500/10 bg-base-color/5 hover:text-base-color/80 text-base-color/50 p-2 rounded-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15.988 3.012A2.25 2.25 0 0 1 18 5.25v6.5A2.25 2.25 0 0 1 15.75 14H13.5V7A2.5 2.5 0 0 0 11 4.5H8.128a2.252 2.252 0 0 1 1.884-1.488A2.25 2.25 0 0 1 12.25 1h1.5a2.25 2.25 0 0 1 2.238 2.012ZM11.5 3.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v.25h-3v-.25Z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M2 7a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7Zm2 3.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Zm0 3.5a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <div className="flex bg-/neutral-50 rounded-md py-3 px-2 items-center justify-between">
                <div>
                  <div className="capitalize text-neutral-500 dark:text-neutral-300 font-medium text-sm /font-semibold">
                    Card Zip Code
                  </div>
                  <div
                    className={`${inter.className} text-neutral-600 dark:text-neutral-300 font-medium /text-sm  f/ont-light`}
                  >
                    {cardInfo.cardZipCode}
                  </div>
                </div>
                <div
                  onClick={() => {
                    navigator.clipboard.writeText(cardInfo.cardZipCode);
                    toast.success(`Card Zip Code copied`.toUpperCase());
                  }}
                  className="icon cursor-pointer hover:bg-base-color/10 dark:text-blue-500 hover:dark:bg-blue-500/10 transition-all bg-base-color/5 hover:text-base-color/80 text-base-color/50 p-2 rounded-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15.988 3.012A2.25 2.25 0 0 1 18 5.25v6.5A2.25 2.25 0 0 1 15.75 14H13.5V7A2.5 2.5 0 0 0 11 4.5H8.128a2.252 2.252 0 0 1 1.884-1.488A2.25 2.25 0 0 1 12.25 1h1.5a2.25 2.25 0 0 1 2.238 2.012ZM11.5 3.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v.25h-3v-.25Z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M2 7a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7Zm2 3.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Zm0 3.5a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
