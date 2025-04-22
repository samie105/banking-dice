"use client";
import React, { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Inter } from "next/font/google";
import { useFetchInfo } from "@/lib/data/fetchPost";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function TransferHistory() {
  const { data: deets } = useFetchInfo();
  const data = deets!.data;
  const transfers = data.transferHistory;
  const sortedTransfer = transfers.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const [activeTab, setActiveTab] = useState<
    "all" | "success" | "failed" | "pending"
  >("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTransfers = useMemo(() => {
    return sortedTransfer.filter(
      (transfer) =>
        (activeTab === "all" || transfer.status === activeTab) &&
        (transfer.receipientBankName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
          transfer.receipientAccountNumber.toString().includes(searchTerm) ||
          transfer.receipientRoutingNumber.toString().includes(searchTerm))
    );
  }, [transfers, activeTab, searchTerm]);

  const formatDate = (date: string | Date | null | undefined) => {
    if (!date) {
      return ""; // or some other default value
    }
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return ""; // or some other default value
    }
    return parsedDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="space-y-4 mt-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
        <Tabs
          defaultValue="all"
          onValueChange={(value) => setActiveTab(value as typeof activeTab)}
          className="/w-full /sm:w-auto bg-neutral-50 border-none rounded-md"
        >
          <TabsList className="grid w-full/ bg-neutral-50 dark:bg-neutral-800 grid-cols-4 rounded-md">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="success">Success</TabsTrigger>
            <TabsTrigger value="failed">Failed</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
          </TabsList>
        </Tabs>

        <Input
          placeholder="Search transfers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-64 bg-neutral-50 border-neutral-500/10"
        />
      </div>

      {filteredTransfers.length === 0 ? (
        <p className="text-center text-sm text-neutral-500 my-8">
          No transfer history available
        </p>
      ) : (
        <div className="rounded-md border-none overflow-x-auto">
          <Table>
            <TableHeader className="border-none">
              <TableRow>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="text-nowrap">Account Number</TableHead>
                <TableHead className="text-nowrap">Routing Number</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Bank Name</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransfers.map((transfer) => (
                <TableRow key={transfer.id} className="border-none">
                  <TableCell
                    className={` whitespace-nowrap  text-neutral-500 dark:text-neutral-300 font-medium ${inter.className}`}
                  >
                    {formatCurrency(transfer.amount)}
                  </TableCell>
                  <TableCell
                    className={`whitespace-nowrap text-neutral-500 dark:text-neutral-300 text-sm ${inter.className}`}
                  >
                    {formatDate(transfer.date)}
                  </TableCell>
                  <TableCell
                    className={`whitespace-nowrap font-normal ${inter.className}`}
                  >
                    {transfer.recipientName}
                  </TableCell>
                  <TableCell
                    className={`whitespace-nowrap font-normal ${inter.className}`}
                  >
                    {transfer.receipientAccountNumber}
                  </TableCell>
                  <TableCell
                    className={`whitespace-nowrap font-normal ${inter.className}`}
                  >
                    {transfer.receipientRoutingNumber}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold
                      ${
                        transfer.status === "success"
                          ? "bg-green-100 text-green-800"
                          : transfer.status === "failed"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {transfer.status.charAt(0).toUpperCase() +
                        transfer.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {transfer.receipientBankName}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {transfer.description || '-'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
