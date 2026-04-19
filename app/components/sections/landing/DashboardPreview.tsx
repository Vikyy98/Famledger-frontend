import { TrendingUp, TrendingDown, Wallet } from "lucide-react";

/**
 * A pure-markup recreation of the in-app dashboard tiles, framed by a
 * mock browser chrome. Used as the hero preview on the landing page so we
 * never ship a broken <img> tag.
 *
 * When a real screenshot is available, drop it at
 *   /public/dashboard-preview.png
 * and replace this component's body with a single <Image /> tag.
 */
const DashboardPreview = () => {
  return (
    <div className="relative">
      {/* Soft emerald glow behind the frame */}
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-tr from-emerald-100/40 via-indigo-100/30 to-transparent blur-2xl"
      />

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_20px_60px_-20px_rgba(15,23,42,0.18)]">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 border-b border-gray-200 bg-gray-50 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
          <div className="ml-3 hidden min-w-0 flex-1 sm:block">
            <div className="inline-flex max-w-full items-center gap-1.5 truncate rounded-md bg-white px-2.5 py-1 text-[11px] text-gray-500 ring-1 ring-gray-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              famledger.app/dashboard
            </div>
          </div>
        </div>

        {/* App surface */}
        <div className="bg-gray-50 p-5 sm:p-6">
          {/* Stat tiles row */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <PreviewStat
              label="Total Income"
              value="₹1,56,810"
              change="+12.3%"
              tone="income"
            />
            <PreviewStat
              label="Total Expenses"
              value="₹48,220"
              change="-4.1%"
              tone="expense"
            />
            <PreviewStat
              label="Net Savings"
              value="₹1,08,590"
              change="+18.7%"
              tone="savings"
            />
          </div>

          {/* Monthly overview mock */}
          <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[11px] font-medium uppercase tracking-wider text-gray-500">
                Monthly Overview
              </p>
              <div className="flex items-center gap-3 text-[11px] text-gray-500">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Income
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-rose-500" />
                  Expense
                </span>
              </div>
            </div>
            <div className="flex h-28 items-end gap-3">
              {[
                { i: 55, e: 22 },
                { i: 70, e: 28 },
                { i: 60, e: 25 },
                { i: 85, e: 30 },
                { i: 78, e: 35 },
                { i: 92, e: 32 },
              ].map((m, idx) => (
                <div key={idx} className="flex flex-1 items-end gap-1">
                  <div
                    className="flex-1 rounded-t bg-emerald-500"
                    style={{ height: `${m.i}%` }}
                  />
                  <div
                    className="flex-1 rounded-t bg-rose-500"
                    style={{ height: `${m.e}%` }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

type Tone = "income" | "expense" | "savings";

const PreviewStat = ({
  label,
  value,
  change,
  tone,
}: {
  label: string;
  value: string;
  change: string;
  tone: Tone;
}) => {
  const valueClass =
    tone === "income"
      ? "text-emerald-600"
      : tone === "expense"
        ? "text-rose-600"
        : "text-gray-900";

  const changeClass = change.startsWith("-")
    ? tone === "expense"
      ? "text-emerald-600" // decrease in expense = good
      : "text-rose-600"
    : tone === "expense"
      ? "text-rose-600"
      : "text-emerald-600";

  const Icon =
    tone === "income" ? TrendingUp : tone === "expense" ? TrendingDown : Wallet;

  const iconWell =
    tone === "income"
      ? "bg-emerald-50 text-emerald-600 ring-emerald-100"
      : tone === "expense"
        ? "bg-rose-50 text-rose-600 ring-rose-100"
        : "bg-gray-100 text-gray-600 ring-gray-200";

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-medium uppercase tracking-wider text-gray-500">
            {label}
          </p>
          <p
            className={`mt-1.5 text-xl font-semibold tracking-tight tabular-nums ${valueClass}`}
          >
            {value}
          </p>
          <p
            className={`mt-1 inline-flex items-center gap-1 text-[11px] font-medium tabular-nums ${changeClass}`}
          >
            <span className="h-1 w-1 rounded-full bg-current" />
            {change}
          </p>
        </div>
        <span
          className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full ring-1 ${iconWell}`}
        >
          <Icon className="h-4 w-4" />
        </span>
      </div>
    </div>
  );
};

export default DashboardPreview;
