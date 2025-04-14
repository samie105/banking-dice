"use client";

import React, { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { Loader2, Clock } from "lucide-react";
import LottieLoader from "./LottieLoader";
import { useAction } from "next-safe-action/hooks";
import { updateTransferHistory } from "@/server/dashboard/transferAction";
import { toast } from "sonner";
import { useFetchInfo } from "@/lib/data/fetchPost";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

type TransferFormData = {
  bankName: string;
  recipientName: string;
  recipientAccountNumber: string;
  recipientRoutingNumber: string;
  transactionPin: string;
  amount: string;
};

export default function TransferHeaders() {
  let toastId: any;
  const { data: deets } = useFetchInfo();
  const data = deets!.data;
  const correctTransactionPin = data.transactionPin; // Set the correct
  const defaultAmount = data.accountBalance; // Set your default amount here
  const successfulTransfers = data.transferHistory.filter(
    (transfer) => transfer.status === "success"
  );
  const totalSuccessfulAmount = successfulTransfers.reduce(
    (acc, transfer) => acc + transfer.amount,
    0
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogPage, setDialogPage] = useState<
    "form" | "processing" | "pending"
  >("form");
  const [transferDetails, setTransferDetails] =
    useState<TransferFormData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<TransferFormData>();

  const { execute, status } = useAction(updateTransferHistory, {
    onError(error) {
      if (error.error.fetchError)
        toast.error("Error communicating with server", {
          id: toastId,
        });
      if (error.error.serverError)
        toast.error("Error connecting to servers", {
          id: toastId,
        });
      if (error.error.validationErrors)
        toast.error("Error performing task", {
          id: toastId,
        });

      toast.dismiss(toastId);
      setDialogPage("form");
    },
    onSuccess() {
      setDialogPage("processing");
    },
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (dialogPage === "processing") {
      timer = setTimeout(() => {
        setDialogPage("pending");
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [dialogPage]);

  const onSubmit: SubmitHandler<TransferFormData> = (data) => {
    const amount = parseFloat(data.amount);
    if (amount > defaultAmount) {
      setError("amount", {
        type: "manual",
        message: "Insufficient funds. Please enter a lower amount.",
      });
      return;
    }
    clearErrors("amount");

    if (parseInt(data.transactionPin) !== correctTransactionPin) {
      setError("transactionPin", {
        type: "manual",
        message: "Incorrect transaction PIN.",
      });
      return;
    }
    clearErrors("transactionPin");

    const transfer = {
      id: Date.now(),
      amount: parseFloat(data.amount),
      date: new Date(),
      receipientAccountNumber: parseInt(data.recipientAccountNumber),
      receipientRoutingNumber: parseInt(data.recipientRoutingNumber),
      status: "pending",
      receipientBankName: data.bankName,
      recipientName: data.recipientName,
    };
    setTransferDetails(data);
    execute(transfer);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setDialogPage("form");
    setTransferDetails(null);
  };

  return (
    <div className="flex justify-between items-center">
      <div className="">
        <div className="dep-type text-xs gap-x-1 bg-neutral-500/5 p-2 md:px-4 rounded-md inline-flex items-center font-semibold dark:bg-blue-500/10 dark:text-blue-500 text-neutral-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-4"
          >
            <path d="M11.47 1.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1-1.06 1.06l-1.72-1.72V7.5h-1.5V4.06L9.53 5.78a.75.75 0 0 1-1.06-1.06l3-3ZM11.25 7.5V15a.75.75 0 0 0 1.5 0V7.5h3.75a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h3.75Z" />
          </svg>
          <p> Transfers</p>
        </div>
        <div
          className={`Fixed-balance text-3xl mt-2 pl-3 font-bold text-neutral-600 dark:text-neutral-300 ${inter.className}`}
        >
          <span className="text-sm">$</span>
          {totalSuccessfulAmount.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>{" "}
        <p className="text-neutral-400 text-xs mt-1 font-medium pl-3 ">
          Total successful transfers
        </p>
      </div>
      <div className="flex gap-x-2">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger>
            <div className="create-new cursor-pointer hover:bg-base-color/10 dark:bg-blue-500/10 dark:text-blue-500 dark:hover:bg-blue-500/10 transition-all flex items-center md:gap-x-2 bg-base-color/5 text-base-color/80 px-3 py-3 rounded-sm font-medium">
              <div className="text-sm font-semibold hidden md:block">
                Make a Transfer
              </div>{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5"
              >
                <path d="M11.47 1.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1-1.06 1.06l-1.72-1.72V7.5h-1.5V4.06L9.53 5.78a.75.75 0 0 1-1.06-1.06l3-3ZM11.25 7.5V15a.75.75 0 0 0 1.5 0V7.5h3.75a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h3.75Z" />
              </svg>
            </div>
          </DialogTrigger>{" "}
          <DialogContent className="w-[95%] sm:max-w-[425px]">
            {dialogPage === "form" && (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <div>
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    placeholder="Enter amount"
                    className={`${inter.className} bg-neutral-50 border-neutral-500/10`}
                    {...register("amount", {
                      required: "Amount is required",
                      validate: (value) =>
                        parseFloat(value) <= defaultAmount ||
                        "Insufficient funds",
                    })}
                  />
                  {errors.amount && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.amount.message}
                    </p>
                  )}
                </div>
                <div className="separator w-20 h-0.5 my-2 bg-black/10 mx-auto"></div>
                <div>
                  <Label htmlFor="bankName">Bank Name</Label>
                  <Input
                    id="bankName"
                    placeholder="Enter bank name"
                    className={`bg-neutral-50 border-neutral-500/10`}
                    {...register("bankName", {
                      required: "Bank name is required",
                    })}
                  />
                  {errors.bankName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.bankName.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="recipientName">Recipient Name</Label>
                  <Input
                    className={`bg-neutral-50 border-neutral-500/10`}
                    id="recipientName"
                    placeholder="Enter recipient name"
                    {...register("recipientName", {
                      required: "Recipient name is required",
                    })}
                  />
                  {errors.recipientName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.recipientName.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="recipientAccountNumber">
                    Recipient Account Number
                  </Label>
                    <Input
                    id="recipientAccountNumber"
                    type="text"
                    placeholder="Enter account number"
                    className={`${inter.className} bg-neutral-50 border-neutral-500/10`}
                    {...register("recipientAccountNumber", {
                      required: "Account number is required",
                      pattern: {
                      value: /^[0-9]{5,}$/,
                      message: "Account number must be at least 5 digits",
                      },
                    })}
                    />
                  {errors.recipientAccountNumber && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.recipientAccountNumber.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="recipientRoutingNumber">
                    Recipient Routing Number
                  </Label>
                  <Input
                    id="recipientRoutingNumber"
                    type="text"
                    placeholder="Enter 9-digit routing number"
                    className={`${inter.className} bg-neutral-50 border-neutral-500/10`}
                    {...register("recipientRoutingNumber", {
                      required: "Routing number is required",
                      pattern: {
                        value: /^[0-9]{9}$/,
                        message: "Routing number must be exactly 9 digits",
                      },
                    })}
                  />
                  {errors.recipientRoutingNumber && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.recipientRoutingNumber.message}
                    </p>
                  )}
                </div>
                <div className="separator w-20 h-0.5 my-2 bg-black/10 mx-auto"></div>
                <div>
                  <Label htmlFor="transactionPin">Transaction PIN</Label>
                  <Input
                    id="transactionPin"
                    type="password"
                    placeholder="Enter 4-digit PIN"
                    className={`${inter.className} bg-neutral-50 border-neutral-500/10`}
                    {...register("transactionPin", {
                      required: "Transaction PIN is required",
                      pattern: {
                        value: /^[0-9]{4}$/,
                        message: "Transaction PIN must be exactly 4 digits",
                      },
                    })}
                  />
                  {errors.transactionPin && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.transactionPin.message}
                    </p>
                  )}
                </div>
                <Button
                  disabled={status === "executing"}
                  type="submit"
                  className="w-full dark:text-white disabled:opacity-50"
                >
                  Initiate Transfer
                </Button>
              </form>
            )}
            {dialogPage === "processing" && (
              <div className="flex flex-col items-center justify-center space-y-4">
                <LottieLoader />
                <h2 className="text-xl font-semibold">
                  Transaction Processing
                </h2>
                <p className="text-center text-balance text-sm text-neutral-500 font-medium">
                  Your transfer is being processed. Please wait while we verify
                  the information you provided. If everything is accurate, the
                  transaction will be completed successfully.
                </p>
              </div>
            )}
            {dialogPage === "pending" && transferDetails && (
              <div className="flex flex-col items-center justify-center space-y-4">
                <Clock className="w-16 h-16 text-yellow-500" />
                <h2 className="text-xl font-semibold">Transaction Pending</h2>
                <p className="text-center text-balance text-sm text-neutral-500 font-medium">
                  Your transfer is pending and will be processed within 1-3
                  business days.
                </p>
                <div className="w-full space-y-2 text-sm rounded-md dark:bg-neutral-800 bg-neutral-50 p-2">
                  <p className="bg-neutral-50 dark:bg-neutral-800 rounded-md p-3  font-medium">
                    <span className="font-semibold text-neutral-700 dark:text-neutral-500">
                      Amount:
                    </span>{" "}
                    <span
                      className={`${inter.className} text-neutral-500 dark:text-neutral-300`}
                    >
                      ${transferDetails.amount}
                    </span>
                  </p>
                  <p className="bg-neutral-50 dark:bg-neutral-700/30 rounded-md p-3  font-medium">
                    <span className="font-semibold text-neutral-700 dark:text-neutral-500">
                      Recipient Routing Number:
                    </span>{" "}
                    <span
                      className={`${inter.className} text-neutral-500 dark:text-neutral-300`}
                    >
                      {transferDetails.recipientRoutingNumber}
                    </span>
                  </p>
                  <p className="bg-neutral-50 dark:bg-neutral-700/30 rounded-md p-3  font-medium">
                    <span className="font-semibold text-neutral-700 dark:text-neutral-500">
                      Recipient Account Number:
                    </span>{" "}
                    <span
                      className={`${inter.className} text-neutral-500 dark:text-neutral-300`}
                    >
                      {transferDetails.recipientAccountNumber}
                    </span>
                  </p>
                  <p className="bg-neutral-50 dark:bg-neutral-700/30 rounded-md p-3 font-medium">
                    <span className="font-semibold text-neutral-700 dark:text-neutral-500">
                      Recipient Bank:
                    </span>{" "}
                    <span className="">{transferDetails.bankName}</span>
                  </p>
                  <p className="bg-neutral-50 dark:bg-neutral-700/30 rounded-md p-3 font-medium">
                    <span className="font-semibold text-neutral-700 dark:text-neutral-500">
                      Recipient Name:
                    </span>{" "}
                    {transferDetails.recipientName}
                  </p>
                </div>
                <Button
                  onClick={closeDialog}
                  className="mt-4 bg-base-color/5 hover:bg-base-color/5 text-base-color/80 dark:bg-blue-500/10 text-blue-500 rounded-sm font-bold"
                >
                  Acknowledged
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
