import React from "react";
import { Chart } from "@/components/dashboard/Dashboard/Chart";
import Fixed from "@/components/dashboard/Dashboard/Fixed";
import Dashboard from "@/components/dashboard/Dashboard/Main";
import TopNav from "@/components/dashboard/Navbar/TopNav";
import AcctSectManager from "@/components/dashboard/Dashboard/AcctSectManager";
import TransactionSummary from "@/components/dashboard/Dashboard/Transaction_Summary";
import Transaction_Chart from "@/components/dashboard/Dashboard/Transaction_Chart";

export default async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const currentMode = searchParams.mode || "account";
  const transactionTab = searchParams.tab || "transfers";

  return (
    <div className=" overflow-hidden p-1/ rounded-md ">
      <div className="h-[calc(100vh-5.5rem)] hidden md:block overflow-y-scroll overflow-x-hidden rounded-md">
        {" "}
        <Dashboard />
        <div className="grid grid-cols-1 md:grid-cols-2 mt-1 gap-y-1 gap-x-1">
          {" "}
          <Fixed />
          <Chart />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-1 gap-y-1 gap-x-1 pb-2">
          {" "}
          <TransactionSummary
            currentMode={currentMode}
            transactionTab={transactionTab}
          />
          <Transaction_Chart />
        </div>
      </div>
      <div className="h-[calc(100vh-5.5rem)] overflow-y-scroll pb-[4.5rem]  md:hidden overflow-x-hidden rounded-md">
        <div className="bg-white dark:bg-neutral-900 mb-2 rounded-md p-3 ">
          <TopNav currentMode={currentMode} transactionTab={transactionTab} />
          <div className="mt-1" />
          <AcctSectManager currentMode={currentMode} />{" "}
        </div>
        {/* <QuickLinkSect /> */}
        <TransactionSummary
          currentMode={currentMode}
          transactionTab={transactionTab}
        />
      </div>
    </div>
  );
}
