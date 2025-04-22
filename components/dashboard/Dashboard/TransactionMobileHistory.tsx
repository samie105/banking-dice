import { Inter } from "next/font/google";
import Link from "next/link";
import React from "react";
const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function TransactionMobileHistory({
  currentMode,
  transactionTab,
}: {
  currentMode: string | string[];
  transactionTab: string | string[];
}) {
  const tabs = [
    {
      name: "deposits",
      icon: (
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
            d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
          />
        </svg>
      ),
    },
    {
      name: "transfers",
      icon: (
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
            d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
          />
        </svg>
      ),
    },
  ];
  const transactionHistory = [
    {
      id: 1,
      amount: 23332,
      date: new Date(),
      receipientAccountNumber: 5553333332,
      status: "pending",
      receipientNmae: "Oj Richie",
      receipientBankName: "Chase Bank",
      description: "",
    },
    {
      id: 1,
      amount: -23774,
      date: new Date(),
      receipientAccountNumber: 5553333332,
      status: "pending",
      receipientNmae: "Matthew Hogswart",
      receipientBankName: "Truist Bank",
      description: "",
    },
    {
      id: 1,
      amount: 4000,
      date: new Date(),
      receipientAccountNumber: 5553333332,
      status: "pending",
      receipientNmae: "James Addijones",
      receipientBankName: "Bank of America",
      description: "",
    },
  ];
  return (
    <div className="bg-white mt-1 p-4 rounded-md">
      <div className="title text-sm font-semibold text-neutral-600">
        Recent Transactions
      </div>
      <div className="flex items-center mt-6 font-medium space-x-2">
        {tabs.map((tab) => (
          <Link
            href={`?mode=${currentMode}&tab=${tab.name}`}
            key={tab.name}
            className={` px-3 py-2 flex gap-x-2 items-center rounded-sm text-sm capitalize ${
              tab.name === transactionTab
                ? "bg-base-color/5 text-base-color/80 font-semibold"
                : "bg-neutral-400/5 text-neutral-500"
            }`}
          >
            {tab.icon} <p>{tab.name}</p>
          </Link>
        ))}
      </div>
      <div className="mt-3">
        {transactionHistory.length >= 1 && (
          <div className="space-y-1 ">
            {transactionHistory.map((history, index) => (
              <>
                <div
                  key={history.id}
                  className="border-neutral-500/10  flex justify-between items-center  /border rounded-md p-2"
                >
                  {" "}
                  <div className="first-box flex items-center gap-x-4">
                    {" "}
                    <div className="logo-area rounded-full bg-base-color/5 p-4 text-base-color/80 ">
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
                    <div className="transaction-details text-sm">
                      <div className="name font-semibold text-neutral-600">
                        {history.receipientNmae}
                      </div>
                      <div
                        className={`detail text-xs mt-0.5 font-normal text-neutral-500 ${inter.className}`}
                      >
                        {history.date.toLocaleString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}{" "}
                        |{" "}
                        {history.date.toLocaleString("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        })}
                      </div>
                      {history.description && (
                        <div className="description text-xs text-neutral-400 mt-1">
                          {history.description}
                        </div>
                      )}
                    </div>{" "}
                  </div>
                  <div
                    className={`amount-box font-semibold text-xs ${
                      inter.className
                    } ${
                      history.amount < 0 ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    {history.amount < 0
                      ? `-$${Math.abs(history.amount).toLocaleString()}`
                      : `+$${history.amount.toLocaleString()}`}
                  </div>{" "}
                </div>{" "}
                {index < transactionHistory.length - 1 && (
                  <div className="separator w-5/6 h-[1px] my-1 bg-black/10 mx-auto"></div>
                )}
              </>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
