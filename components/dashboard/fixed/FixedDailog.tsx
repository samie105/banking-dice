import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFetchInfo } from "@/lib/data/fetchPost";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const roiRates = {
  1: 5,
  3: 7,
  6: 10,
  9: 12,
  12: 15,
  24: 20,
};

export function FixedDialog({ text }: { text?: boolean }) {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState<number | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const [roi, setRoi] = useState(0);
  const [totalReturn, setTotalReturn] = useState(0);
  const { data: deets } = useFetchInfo();
  const data = deets!.data;
  const router = useRouter();
  router.prefetch("/dashboard/deposit");

  useEffect(() => {
    if (duration && amount) {
      const roiPercentage = roiRates[duration as keyof typeof roiRates];
      const roiAmount = (amount * roiPercentage) / 100;
      setRoi(roiPercentage);
      setTotalReturn(amount + roiAmount);
    }
  }, [duration, amount]);

  const isFormValid = name && duration && amount && amount >= 100;

  const handleSubmit = () => {
    if (amount! > data.accountBalance)
      toast("Insufficient Funds", {
        description: "You don't have enough funds",
        action: {
          label: "Deposit",
          onClick: () => router.push("/dashboard/deposit"),
        },
      });
    if (isFormValid) {
      const investment: FixedType = {
        id: Date.now().toString(),
        roi,
        totalReturn,
        name,
        startDate: new Date(),
        endDate: new Date(Date.now() + duration * 30 * 24 * 60 * 60 * 1000),
        amount,
        duration,
        status: "running",
      };
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className="add-fixed-action flex md:pr-4 text-sm font-semibold items-center gap-x-2 rounded-md bg-base-color/5 /border /border-black/10 p-3 text-base-color/80">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5"
          >
            <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
          </svg>
          <p className="hidd/en md:block text-sm">{text && "Create New"}</p>
        </div>{" "}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Fixed Account Investment</DialogTitle>
          <DialogDescription className="w-[90%]">
            Create a new fixed investment plan. Fill in the details below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter fixed name"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="duration">Duration</Label>
            <Select onValueChange={(value) => setDuration(Number(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 month</SelectItem>
                <SelectItem value="3">3 months</SelectItem>
                <SelectItem value="6">6 months</SelectItem>
                <SelectItem value="9">9 months</SelectItem>
                <SelectItem value="12">12 months</SelectItem>
                <SelectItem value="24">24 months</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="amount">Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              value={amount || ""}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="Enter investment amount"
            />

            {amount !== null && amount < 100 && (
              <div className="error-message bg-red-400/10 p-2 rounded-sm text-red-500 text-sm">
                {" "}
                <span className="font-semibold">$100</span> is the Minimum
                amount
              </div>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="roi">ROI (%)</Label>
            <Input id="roi" value={roi} readOnly placeholder="Calculated ROI" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="totalReturn">Total Return</Label>
            <Input
              id="totalReturn"
              value={totalReturn.toFixed(2)}
              readOnly
              placeholder="Calculated total return"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={!isFormValid}
            className="w-full"
          >
            Create Fixed
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
