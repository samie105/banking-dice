"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useDropzone } from "react-dropzone";
import { useAction } from "next-safe-action/hooks";
import {
  updateDepositHistory,
  uploadImageUserDeposit,
} from "@/server/actions/paymentUpload";
import { PaymentAddress } from "@/server/addressSchema";

export default function DepMobileOptions({ data }: { data: PaymentAddress }) {
  const paymentMethods = [
    {
      name: "bitcoin",
      src: "/assets/mbp/bitcoin.webp",
      address: data.bitcoin || "",
    },
    {
      name: "ethereum",
      src: "/assets/mbp/ETH.svg",
      address: data.ethereum || "",
    },
    {
      name: "litecoin",
      src: "/assets/mbp/LTC.svg",
      address: data.litecoin || "",
    },
    {
      name: "dogecoin",
      src: "/assets/mbp/DOGE.svg",
      address: data.dogecoin || "",
    },
    {
      name: "paypal",
      src: "/assets/mbp/paypal.webp",
      address: data.paypal || "",
    },
    {
      name: "zelle",
      src: "/assets/mbp/zelle.png",
      address: data.zelle || "",
    },
    {
      name: "venmo",
      src: "/assets/mbp/venmo.png",
      address: data.venmo || "",
    },
    {
      name: "cashapp",
      src: "/assets/mbp/cashapp.png",
      address: data.cashapp || "",
    },
  ];
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [paid, setPaid] = useState(false);
  const [amount, setAmount] = useState<number>();
  const [url, setUrl] = useState<string>("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null);
  let toastId: any;
  const { execute, status } = useAction(uploadImageUserDeposit, {
    onError(error) {
      if (error.error.fetchError)
        toast.error("Error Initiating transaction", {
          id: toastId,
        });
      if (error.error.serverError)
        toast.error("Error connecting to servers", {
          id: toastId,
        });
      if (error.error.validationErrors)
        toast.error("Error, try again later", {
          id: toastId,
        });

      toast.dismiss(toastId);
    },
    onExecute() {
      toast.loading("Uploading Image, Please wait...", {
        id: toastId,
      });
    },
    onSuccess({ data }) {
      if (data?.success) {
        toast.success("Image uploaded successfully", {
          id: toastId,
          duration: 3000,
        });
        setUrl(data.url);
      }
      if (!data?.success) {
        toast.error("Error uploading image", {
          id: toastId,
          duration: 3000,
        });
      }
      toast.dismiss(toastId);
    },
  });
  const { execute: exec, status: historyStat } = useAction(
    updateDepositHistory,
    {
      onError(error) {
        if (error.error.fetchError)
          toast.error("Error initiating transaction", {
            id: toastId,
          });
        if (error.error.serverError)
          toast.error("Error connecting to servers", {
            id: toastId,
          });
        if (error.error.validationErrors)
          toast.error("Error, try again later", {
            id: toastId,
          });

        toast.dismiss(toastId);
      },
      onExecute() {
        toast.loading("Verifiying deposit", {
          id: toastId,
        });
      },
      onSuccess({ data }) {
        if (data?.success) {
          toast.success("Your deposit is in review", {
            id: toastId,
            duration: 3000,
          });
        }

        toast.dismiss(toastId);
      },
    }
  );
  useEffect(() => console.log(url), [url]);
  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
    toast.success("Copied successfully");
  };

  const onDrop = (acceptedFiles: File[], rejectedFiles: any) => {
    if (rejectedFiles.length > 0) {
      toast.error("Only JPG and PNG files are accepted");
      return;
    }
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);
    formData.append("upload_preset", "my_preset");
    execute({ file: formData });

    setUploadedFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    },
    maxFiles: 1,
  });

  const selectedMethod = paymentMethods.find(
    (method) => method.name === selectedPaymentMethod
  );
  const handleUpload = () => {
    exec({ amount, url });
  };
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-sm p-1.5">
      <Dialog>
        <div className="text-lg md:px-4 py-3 text-neutral-600 dark:text-neutral-300 font-semibold pt-4 pb-2">
          Deposit using mobile
        </div>
        <div className="cont grid grid-cols-2 md:grid-cols-4 gap-2">
          {paymentMethods.slice(0, 4).map((method) => (
            <DialogTrigger
              key={method.name}
              disabled={historyStat === "executing"}
            >
              {" "}
              <div
                className={`font-semibold disabled:opacity-25 md:py-5 py-4 px-3 cursor-pointer flex items-center text-sm md:text-base text-right rounded-sm ${
                  method.name === selectedPaymentMethod
                    ? "bg-base-color/10 dark:bg-blue-500/10 text- border-base-color/10 border"
                    : "bg-neutral-500/5 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-400 hover:bg-neutral-500/10"
                }`}
                onClick={() => setSelectedPaymentMethod(method.name)}
              >
                <Image
                  alt=""
                  src={method.src}
                  width={1000}
                  height={1000}
                  className="size-5 md:size-7 mr-2"
                />
                <div>
                  {method.name.charAt(0).toUpperCase() + method.name.slice(1)}
                </div>
              </div>{" "}
            </DialogTrigger>
          ))}
          {paymentMethods.slice(4, 8).map((method) => (
            <DialogTrigger
              key={method.name}
              disabled={historyStat === "executing"}
            >
              <div
                key={method.name}
                className={`font-semibold text-sm md:text-base disabled:opacity-25 md:py-5 py-4 px-3 cursor-pointer flex items-center  text-right rounded-sm ${
                  method.name === selectedPaymentMethod
                    ? "bg-base-color/10 dark:bg-blue-500/10 text- border-base-color/10 border"
                    : "bg-neutral-500/5 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-400 hover:bg-neutral-500/10"
                }`}
                onClick={() => setSelectedPaymentMethod(method.name)}
              >
                <Image
                  alt=""
                  src={method.src}
                  width={1000}
                  height={1000}
                  className="size-5 md:size-7 mr-2 rounded-full"
                />
                <div>
                  {method.name.charAt(0).toUpperCase() + method.name.slice(1)}
                </div>
              </div>{" "}
            </DialogTrigger>
          ))}{" "}
        </div>

        <DialogContent className="w-[90%] dark:bg-neutral-900 flex flex-col rounded-md">
          {selectedMethod && (
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center justify-center gap-x-2">
                <Image
                  alt=""
                  src={selectedMethod.src}
                  width={100}
                  height={100}
                  className="h-10 w-10 rounded-full"
                />
              </div>

              {!paid && (
                <>
                  {" "}
                  <div className="amountbox w-full">
                    <label
                      htmlFor="amount"
                      className="text-sm font-medium text-neutral-500"
                    >
                      Deposit amount ($)
                    </label>
                    <div className="bg-neutral-50 dark:bg-neutral-800 mt-1 text-sm rounded-md flex items-center justify-between p-2">
                      <Input
                        className="w-full focus-within:outline-none focus:outline-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-neutral-50 ring-0 focus-within:ring-0 focus:ring-0"
                        value={amount}
                        type="number"
                        placeholder="Deposit amount"
                        onChange={(e) =>
                          setAmount(parseInt(e.target.value, 10))
                        }
                        id="amount"
                      />
                    </div>
                  </div>
                  <div className="address box w-full text-sm">
                    <label htmlFor={selectedMethod.address + "address"}>
                      {selectedMethod.name.charAt(0).toUpperCase() +
                        selectedMethod.name.slice(1)}{" "}
                      ID
                    </label>
                    <div className="bg-neutral-50 dark:bg-neutral-800 mt-1 text-sm rounded-md flex items-center justify-between py-2 px-2">
                      <Input
                        className="w-5/6 focus-within:outline-none focus:outline-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-neutral-50 ring-0 focus-within:ring-0 focus:ring-0"
                        value={selectedMethod.address}
                        readOnly
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        onClick={() => handleCopy(selectedMethod.address)}
                        className="size-5 cursor-pointer text-gray-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="payment-checker">
                    <div className="notes text-xs dark:bg-neutral-800 dark:text-neutral-500 bg-neutral-100 text-neutral-600 font-medium/ rounded-md p-3">
                      Copy the payment id and make the transaction. When done,
                      click on the button below to proceed. Be sure to have made
                      the transaction before proceeding as the payment id is
                      bound to change
                    </div>
                    <Button
                      disabled={!amount || isNaN(amount)}
                      className="btn w-full h-12 text-sm gap-x-2 mt-3 bg-base-color/80 dark:bg-blue-500 text-white"
                      onClick={() => {
                        setPaid(true);
                      }}
                    >
                      {" "}
                      <p>Payment Done</p>
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
                    </Button>
                  </div>
                </>
              )}
              {paid && (
                <div className="w-full">
                  <Label className="block pb-4 text-sm font-medium text-gray-700 dark:text-neutral-400">
                    Upload Payment Screenshot of{" "}
                    <span className="font-semibold">
                      ${amount?.toLocaleString()}
                    </span>
                  </Label>
                  <div
                    {...getRootProps()}
                    className="mt-1 flex items-center justify-between p-4 border border-dashed dark:border-neutral-700 rounded-md cursor-pointer"
                  >
                    <Input {...getInputProps()} />
                    <div className="text-neutral-500 dark:text-neutral-300 text-sm w-full">
                      {uploadedFile === null ? (
                        <div className="flex-col flex font-medium w-full items-center justify-center gap-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-12 opacity-20 dark:text-neutral-300"
                          >
                            <path
                              fillRule="evenodd"
                              d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <p>
                            Drag & drop a file here, or click to select a file
                          </p>
                        </div>
                      ) : (
                        <>Not the file? Upload a different file</>
                      )}
                    </div>
                  </div>
                  {uploadedFile && (
                    <div className="mt-4 bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-300 text-sm p-4 rounded-md flex items-center justify-between">
                      <span>{uploadedFile.name}</span>
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => setUploadedFile(null)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                  <div className="payment-checker mt-2">
                    <div className="notes text-sm dark:bg-neutral-800 dark:text-neutral-400 bg-neutral-100 text-neutral-600 font-medium/ rounded-sm p-2">
                      Upload the payment transaction screenshot as a means of
                      verifying the payemnt. Note the process of verification is
                      automated so do well to provide accurate payment proof to
                      avoid payment losses.
                    </div>
                    <DialogClose className="w-full">
                      <Button
                        onClick={() => handleUpload()}
                        disabled={
                          uploadedFile === null || status === "executing"
                        }
                        className="btn w-full h-12 text-sm gap-x-2 mt-3 bg-base-color/80 dark:bg-blue-500 dark:text-white disabled:cursor-not-allowed"
                      >
                        {" "}
                        <p>Verify Payment</p>
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
                      </Button>
                    </DialogClose>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
