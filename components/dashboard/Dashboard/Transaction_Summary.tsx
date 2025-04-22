"use client";
import React from "react";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useFetchInfo } from "@/lib/data/fetchPost";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

type Transfers = {
  id: any;
  recipientName: string;
  amount: number;
  date: Date;
  receipientAccountNumber: number;
  receipientRoutingNumber: number;
  status: "success" | "failed" | "pending";
  receipientBankName: string;
  description?: string;
};

type Deposits = {
  id: any;
  amount: number;
  paymentMeans: "mobile deposit" | "check";
  status: "failed" | "success" | "pending";
  date: Date;
  screenshotLink: string;
  description?: string;
};

export default function TransactionSummary({
  currentMode,
  transactionTab,
}: {
  currentMode: string | string[];
  transactionTab: string | string[];
}) {
  const { data: deets } = useFetchInfo();
  const data = deets!.data;

  const allTransactions = [
    ...data.transferHistory.map((t: Transfers) => ({ ...t, type: "transfer" })),
    ...data.depositHistory.map((d: Deposits) => ({ ...d, type: "deposit" })),
  ];

  const sortedTransactions = allTransactions.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const totalTransfered = data.transferHistory.reduce(
    (acc, current) =>
      current.status == "success" ? acc + current.amount : acc,
    0
  );
  const totaldeposited = data.depositHistory.reduce(
    (acc, current) =>
      current.status == "success" ? acc + current.amount : acc,
    0
  );

  return (
    <div className="w-full border-none shadow-none rounded-md p-4 bg-white dark:bg-neutral-900">
      <div className="flex justify-between items-center">
        <div className="">
          <div className="Fixed-type dark:text-neutral-400 w-full text-s gap-x-1 bg-base-color/5/ p-2 rounded-md inline-flex items-center font-semibold text-neutral-700 /text-base-color/80">
            <p>Recent Transactions</p>
          </div>
          <div className="flex w-full gap-x-2 justify-between items-center">
            <div
              className={`transfer-balance bg-neutral-50 dark:bg-neutral-800 dark:text-neutral-300 w-full rounded-md py-2 px-4 text-xl mt-2 /blur-md font-bold text-neutral-600 ${inter.className}`}
            >
              <span className="text-sm">$</span>
              {totaldeposited.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              <div className="text-xs text-neutral-500 dark:text-neutral-400 font-medium mt-2">
                Total <span className="capitalize">Deposited</span>
              </div>
            </div>

            <div
              className={`deposit-balance bg-neutral-50 dark:bg-neutral-800 dark:text-neutral-300 w-full rounded-md py-2 px-4 text-xl mt-2 /blur-md font-bold text-neutral-600 ${inter.className}`}
            >
              <span className="text-sm">$</span>
              {totalTransfered.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              <div className="text-xs text-neutral-500 dark:text-neutral-400 text-nowrap font-medium mt-2">
                Total Transferred
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-between"></div>
      <div className="separator w-20 h-0.5 mt-4 bg-black/10 mx-auto"></div>
      <div className="Fixed-info">
        <h1 className="text-neutral-700 hidden font-bold text-sm mt-5">
          Transaction history
        </h1>
        <div className="Fixed-limit-info mt-5 space-y-6">
          {sortedTransactions.length >= 1 && (
            <div className="space-y-1 ">
              {sortedTransactions.slice(0, 3).map((transaction, index) => (
                <div key={transaction.id}>
                  <div className="border-neutral-500/10 flex justify-between items-center  /border rounded-md p-2">
                    <div className="first-box flex items-center gap-x-2">
                      <div
                        className={`logo-area rounded-full  p-4 text-neutral-600/ ${
                          transaction.status === "success"
                            ? "bg-green-500/10 text-green-500"
                            : transaction.status === "failed"
                            ? "bg-red-500/10 text-red-500"
                            : "bg-orange-400/10 text-orange-500 dark:bg-orange-500/10 "
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                          />
                        </svg>
                      </div>
                      <div className="transaction-details capitalize text-sm">
                        <div className="name font-semibold">
                          {"recipientName" in transaction
                            ? transaction.recipientName
                            : transaction.paymentMeans}{" "}
                          |{" "}
                          <span className="text-neutral-400 font-medium">
                            {transaction.status}
                          </span>
                        </div>
                        <div
                          className={`detail text-xs font-normal text-neutral-500 ${inter.className}`}
                        >
                          {new Date(transaction.date).toLocaleString("en-US", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                          })}
                        </div>
                        {transaction.description && (
                          <div className="description text-xs text-neutral-400 mt-1">
                            {transaction.description}
                          </div>
                        )}
                      </div>
                    </div>
                    <div
                      className={`amount-status-box flex items-center gap-x-2 font-semibold text-sm ${
                        inter.className
                      } ${
                        transaction.type === "deposit"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      <div className="amount">
                        {" "}
                        {transaction.type === "deposit"
                          ? `+$${transaction.amount.toLocaleString()}`
                          : `-$${transaction.amount.toLocaleString()}`}
                      </div>
                    </div>
                  </div>
                  {index < sortedTransactions.slice(0, 2).length - 1 && (
                    <div className="separator w-5/6 h-[1px] my-1 bg-black/10 dark:bg-white/10 mx-auto"></div>
                  )}
                </div>
              ))}
            </div>
          )}

          {sortedTransactions.length < 1 && (
            <div className="flex items-center min-h-44 h-full justify-center">
              <div className="inner-items /text-center">
                <div className="icon flex justify-center text-neutral-600 dark:text-neutral-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1 11.27c0-.246.033-.492.099-.73l1.523-5.521A2.75 2.75 0 0 1 5.273 3h9.454a2.75 2.75 0 0 1 2.651 2.019l1.523 5.52c.066.239.099.485.099.732V15a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3.73Zm3.068-5.852A1.25 1.25 0 0 1 5.273 4.5h9.454a1.25 1.25 0 0 1 1.205.918l1.523 5.52c.006.02.01.041.015.062H14a1 1 0 0 0-.86.49l-.606 1.02a1 1 0 0 1-.86.49H8.236a1 1 0 0 1-.894-.553l-.448-.894A1 1 0 0 0 6 11H2.53l.015-.062 1.523-5.52Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="text text-neutral-500 dark:text-neutral-300 text-sm font-semibold">
                  No History Here
                </div>
              </div>
            </div>
          )}
          {sortedTransactions.length >= 1 && (
            <div className="flex justify-between gap-x-2 items-center">
              <Link
                className="fixed-main-hist-link flex items-center justify-center dark:bg-transparent dark:border-blue-500/30 dark:text-blue-500 text-sm gap-x-1 font-semibold text-neutral-600 bg-neutral-50 border border-neutral-500/10  transition-all /bg-black/5 w-full rounded-md py-3"
                href={`/dashboard/deposit`}
              >
                <p>View deposits</p>
              </Link>
              <Link
                className="fixed-main-hist-link flex items-center justify-center dark:bg-transparent dark:border-blue-500/30 dark:text-blue-500 text-sm gap-x-1 font-semibold text-neutral-600 bg-neutral-50 border border-neutral-500/10  transition-all /bg-black/5 w-full rounded-md py-3"
                href={`/dashboard/transfers`}
              >
                <p>View transfers</p>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
