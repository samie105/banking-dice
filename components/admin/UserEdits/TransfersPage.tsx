"use client";

import React, { useState } from "react";
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
import { updateTransferStatus } from "@/server/admin/edit-user-actions";

interface Transfer {
  id: any;
  recipientName: string;
  amount: number;
  date: Date;
  receipientAccountNumber: number;
  receipientRoutingNumber: number;
  status: "success" | "failed" | "pending";
  receipientBankName: string;
  description?: string;
}

export default function TransfersPage({ data }: { data: IUser }) {
  const [transferHistory, setTransferHistory] = useState<Transfer[]>(
    data.transferHistory
  );
  const [loadingTransferId, setLoadingTransferId] = useState<string | null>(
    null
  );

  const sortedTransferHistory = [...transferHistory].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const handleTransferAction = async (id: string, isApproved: boolean) => {
    setLoadingTransferId(id);
    try {
      const result = await updateTransferStatus(data.email, id, isApproved);
      if (result.success) {
        setTransferHistory((prevHistory) =>
          prevHistory.map((transfer) =>
            transfer.id === id
              ? { ...transfer, status: isApproved ? "success" : "failed" }
              : transfer
          )
        );
        toast.success(`Transfer ${isApproved ? "approved" : "declined"}`);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast.error("Failed to update transfer status");
    } finally {
      setLoadingTransferId(null);
    }
  };

  return (
    <div className="p-4 space-y-3">
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-4 dark:text-white">
          Transfer History
        </h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Recipient</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Bank Name</TableHead>
              <TableHead>Account Number</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedTransferHistory.map((transfer) => (
              <TableRow key={transfer.id}>
                <TableCell>{transfer.recipientName}</TableCell>
                <TableCell>${transfer.amount.toLocaleString()}</TableCell>
                <TableCell>{transfer.receipientBankName}</TableCell>
                <TableCell>{transfer.receipientAccountNumber}</TableCell>
                <TableCell>{new Date(transfer.date).toLocaleDateString()}</TableCell>
                <TableCell>{transfer.status}</TableCell>
                <TableCell>{transfer.description || '-'}</TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger
                      asChild
                      disabled={transfer.status !== "pending"}
                    >
                      <Button className="dark:border-neutral-800 dark:hover:bg-neutral-800 bg-neutral-100 text-neutral-500 dark:text-white hover:bg-neutral-200 dark:bg-neutral-800">
                        {loadingTransferId === transfer.id ? (
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
                            handleTransferAction(transfer.id, true)
                          }
                          className="hover:dark:bg-neutral-700 text-neutral-500 dark:text-white hover:bg-neutral-200 bg-transparent"
                          disabled={
                            loadingTransferId === transfer.id ||
                            transfer.status !== "pending"
                          }
                        >
                          Approve
                        </Button>
                        <Button
                          onClick={() =>
                            handleTransferAction(transfer.id, false)
                          }
                          className="hover:dark:bg-neutral-700 text-neutral-500 dark:text-white hover:bg-neutral-200 bg-transparent"
                          disabled={
                            loadingTransferId === transfer.id ||
                            transfer.status !== "pending"
                          }
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
    </div>
  );
}
