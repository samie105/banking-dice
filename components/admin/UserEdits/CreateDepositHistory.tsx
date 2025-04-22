"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { addDepositHistory } from "@/server/admin/edit-user-actions";

type DepositFormData = {
  amount: number;
  paymentMeans: "mobile deposit" | "check" | "wire deposit" | "ACH";
  status: "failed" | "success";
  date: string;
  description: string;
};

export default function CreateDepositHistory({ email }: { email: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<DepositFormData>({
    amount: 0,
    paymentMeans: "mobile deposit",
    status: "failed",
    date: new Date().toISOString().split("T")[0],
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await addDepositHistory(email, formData);
      if (result.success) {
        toast.success("Deposit history added successfully");
        setIsOpen(false);
        setFormData({
          amount: 0,
          paymentMeans: "mobile deposit",
          status: "failed",
          date: new Date().toISOString().split("T")[0],
          description: "",
        });
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast.error("Failed to add deposit history: " + (error as Error).message);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="dark:bg-neutral-800 text-sm dark:border-neutral-700 dark:text-white text-neutral-600 bg-neutral-50">
          Add Deposit History
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-lg font-semibold">Add Deposit History</h2>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: parseFloat(e.target.value) })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentMeans">Payment Means</Label>
            <Select
              value={formData.paymentMeans}
              onValueChange={(
                value: "mobile deposit" | "check" | "wire deposit" | "ACH"
              ) => setFormData({ ...formData, paymentMeans: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select payment means" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mobile deposit">Mobile Deposit</SelectItem>
                <SelectItem value="check">Check</SelectItem>
                <SelectItem value="wire deposit">Wire Deposit</SelectItem>
                <SelectItem value="ACH">ACH</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value: "failed" | "success") =>
                setFormData({ ...formData, status: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              type="text"
              placeholder="Enter transaction description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <Button
            type="submit"
            disabled={formData.amount <= 0}
            className="w-full"
          >
            Add Deposit History
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
