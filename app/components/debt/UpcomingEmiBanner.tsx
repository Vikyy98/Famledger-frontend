import React from "react";
import { AlertCircle } from "lucide-react";
import { UpcomingEmi } from "@/app/types/debt";

interface UpcomingEmiBannerProps {
  upcoming: UpcomingEmi[];
}

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const formatDate = (iso: string) => {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
};

const UpcomingEmiBanner: React.FC<UpcomingEmiBannerProps> = ({ upcoming }) => {
  if (!upcoming || upcoming.length === 0) return null;

  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
      <div className="flex gap-3">
        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
          <AlertCircle className="h-4 w-4" />
        </span>
        <div className="text-sm text-amber-900">
          <p className="font-medium">Upcoming EMI Payments</p>
          <p className="mt-1 text-amber-800">
            {upcoming
              .map(
                (e) =>
                  `${e.debtName} (${formatCurrency(e.amount)}) due ${formatDate(
                    e.dueDate
                  )}`
              )
              .join(" • ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEmiBanner;
