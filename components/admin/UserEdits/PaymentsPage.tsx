"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { IUser } from "@/server/userSchema";
import { MoreHorizontal, Loader2 } from "lucide-react";
import {
  updatePaymentVerification,
  updateDepositStatus,
} from "@/server/admin/edit-user-actions";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { DialogContent } from "@radix-ui/react-dialog";
import CreateDepositHistory from "./CreateDepositHistory";

export default function PaymentsPage({ data }: { data: IUser }) {
  const [paymentVerification, setPaymentVerification] = useState(
    data.paymentVerification
  );
  const [depositHistory, setDepositHistory] = useState(data.depositHistory);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [loadingDepositId, setLoadingDepositId] = useState<string | null>(null);

  const handleVerification = async (isApproved: boolean) => {
    const confirmRes = confirm(
      "Do you really want to proceed with this action"
    );
    if (!confirmRes) return;
    if (confirmRes) {
      setIsVerifying(true);
      try {
        const result = await updatePaymentVerification(data.email, isApproved);
        if (result.success) {
          setPaymentVerification(isApproved);
          toast.success(`Payment ${isApproved ? "approved" : "declined"}`);
        } else {
          throw new Error(result.error);
        }
      } catch (error) {
        toast.error("Failed to update payment verification");
      } finally {
        setIsVerifying(false);
      }
    }
  };

  const handleDepositAction = async (id: string, isApproved: boolean) => {
    const confirmRes = confirm(
      "Do you really want to proceed with this action"
    );
    if (!confirmRes) return;
    if (confirmRes) {
      setLoadingDepositId(id);
      try {
        const result = await updateDepositStatus(data.email, id, isApproved);
        if (result.success) {
          setDepositHistory((prevHistory) =>
            prevHistory.map((deposit) =>
              deposit.id === id
                ? { ...deposit, status: isApproved ? "success" : "failed" }
                : deposit
            )
          );
          toast.success(`Deposit ${isApproved ? "approved" : "declined"}`);
        } else {
          throw new Error(result.error);
        }
      } catch (error) {
        toast.error("Failed to update deposit status");
      } finally {
        setLoadingDepositId(null);
      }
    }
  };

  return (
    <div className="p-4 space-y-3">
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4 dark:text-white">
          Payment Verification
        </h2>
        <div className="relative w-full h-64 mb-4">
          <Image
            src={data.paymentImageLink}
            alt="Payment Verification"
            fill
            className="object-contain"
          />
        </div>
        <div className="flex justify-center space-x-4">
          <Button
            onClick={() => handleVerification(true)}
            className="bg-green-500 rounded-sm hover:bg-green-600"
            disabled={isVerifying}
          >
            {isVerifying ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Approve
          </Button>
          <Button
            onClick={() => handleVerification(false)}
            className="bg-red-500 rounded-sm hover:bg-red-600"
            disabled={isVerifying}
          >
            {isVerifying ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Decline
          </Button>
        </div>
        <p className="mt-4 text-center text-sm dark:text-white">
          Status: {paymentVerification ? "Approved" : "Not Approved"}
        </p>
      </div>

      <div className="bg-white dark:bg-neutral-900 p-6 rounded-md shadow-md">
        <div className="flex justify-between">
          {" "}
          <h2 className="text-xl font-bold mb-4 dark:text-white">
            Deposit History
          </h2>{" "}
          <CreateDepositHistory email={data.email} />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Screenshot</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Payment Means</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {depositHistory
              .sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
              )
              .map((deposit) => (
                <TableRow key={deposit.id}>
                  <TableCell>
                    <Image
                      src={deposit.screenshotLink}
                      alt="Deposit Screenshot"
                      width={50}
                      height={50}
                      className="cursor-pointer rounded-sm"
                      onClick={() => setZoomedImage(deposit.screenshotLink)}
                    />
                  </TableCell>
                  <TableCell>${deposit.amount.toFixed(2)}</TableCell>
                  <TableCell>{deposit.paymentMeans}</TableCell>
                  <TableCell>{deposit.status}</TableCell>
                  <TableCell>
                    {new Date(deposit.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{deposit.description || '-'}</TableCell>
                  <TableCell>
                    <Popover>
                      <PopoverTrigger
                        asChild
                        disabled={
                          deposit.status === "success" ||
                          deposit.status === "failed"
                        }
                      >
                        <Button className="dark:border-neutral-800 dark:hover:bg-neutral-800 bg-neutral-100 text-neutral-500 dark:text-white hover:bg-neutral-200 dark:bg-neutral-800">
                          {loadingDepositId === deposit.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <MoreHorizontal className="h-4 w-4" />
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="dark:bg-neutral-800 dark:border-neutral-800">
                        <div className="flex flex-col space-y-2">
                          <Button
                            onClick={() =>
                              handleDepositAction(deposit.id, true)
                            }
                            className="hover:dark:bg-neutral-700 text-neutral-500 dark:text-white hover:bg-neutral-200 bg-transparent"
                            disabled={loadingDepositId === deposit.id}
                          >
                            Approve
                          </Button>
                          <Button
                            onClick={() =>
                              handleDepositAction(deposit.id, false)
                            }
                            className="hover:dark:bg-neutral-700 text-neutral-500 dark:text-white hover:bg-neutral-200 bg-transparent"
                            disabled={loadingDepositId === deposit.id}
                          >
                            Decline
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      {zoomedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setZoomedImage(null)}
        >
          <div className="relative w-3/4 h-3/4">
            <Image
              src={zoomedImage}
              alt="Zoomed Deposit Screenshot"
              layout="fill"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
