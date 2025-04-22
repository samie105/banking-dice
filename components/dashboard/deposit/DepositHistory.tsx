"use client";

import React, { useState, useMemo } from "react";
import { useFetchInfo } from "@/lib/data/fetchPost";
import { Inter } from "next/font/google";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

type DepositStatus = "all" | "success" | "failed" | "pending";

export default function DepositHistory() {
  const { data: deets } = useFetchInfo();
  const data = deets?.data;
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<DepositStatus>("all");

  const sortedAndFilteredHistory = useMemo(() => {
    const history = data?.depositHistory || [];
    return history
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .filter((deposit) => {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch =
          deposit.amount.toString().includes(searchLower) ||
          deposit.paymentMeans.toLowerCase().includes(searchLower) ||
          deposit.status.toLowerCase().includes(searchLower);
        const matchesTab = activeTab === "all" || deposit.status === activeTab;
        return matchesSearch && matchesTab;
      });
  }, [data?.depositHistory, searchTerm, activeTab]);
  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-500 dark:bg-green-600 text-white";
      case "failed":
        return "bg-red-500 dark:bg-red-600 text-white";
      case "pending":
        return "bg-yellow-500 dark:bg-yellow-600 text-white";
      default:
        return "bg-neutral-200 text-neutral-800";
    }
  };

  const formatDate = (date: string | Date | null | undefined) => {
    if (!date) {
      return "";
    }
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return "";
    }
    return parsedDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <Card className="w-full px-0 border-none shadow-none dark:mt-1 dark:rounded-md">
      <div>
        <div className="text-lg px-6 pt-4 pb-2 font-semibold dark:rounded-tr-md dark:rounded-tl-md dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300">
          Deposit History
        </div>
      </div>
      <CardContent className="px-3 dark:bg-neutral-900">
        <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as DepositStatus)}
            className="w-full sm:w-auto"
          >
            <TabsList className="w-full sm:w-auto bg-neutral-50 dark:bg-neutral-800">
              <TabsTrigger
                value="all"
                className="flex-1 sm:flex-none dark:text-neutral-400"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="success"
                className="flex-1 sm:flex-none dark:text-neutral-400"
              >
                Success
              </TabsTrigger>
              <TabsTrigger
                value="pending"
                className="flex-1 sm:flex-none dark:text-neutral-400"
              >
                Pending
              </TabsTrigger>
              <TabsTrigger
                value="failed"
                className="flex-1 sm:flex-none dark:text-neutral-400"
              >
                Failed
              </TabsTrigger>
            </TabsList>
          </Tabs>{" "}
          <div className="w-full sm:w-auto">
            <Input
              type="text"
              placeholder="Search deposits..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 bg-neutral-50 border border-neutral-500/20"
            />
          </div>
        </div>
        {sortedAndFilteredHistory.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-sm">
              {searchTerm
                ? "No matching deposits found."
                : "No deposit history available."}
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className={inter.className}>Amount</TableHead>
                <TableHead className="text-nowrap">Payment Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedAndFilteredHistory.map((deposit) => (
                <TableRow key={deposit.id} className="border-none">
                  <TableCell className={`font-medium ${inter.className}`}>
                    $
                    {deposit.amount.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </TableCell>
                  <TableCell className="capitalize text-nowrap">
                    {deposit.paymentMeans}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold
                      ${
                        deposit.status === "success"
                          ? "bg-green-100 text-green-800"
                          : deposit.status === "failed"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {deposit.status.charAt(0).toUpperCase() +
                        deposit.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>{deposit.description || '-'}</TableCell>
                  <TableCell className="text-right text-nowrap">
                    {formatDate(deposit.date)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
