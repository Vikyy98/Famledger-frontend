import { Users, PieChart, ShieldCheck } from "lucide-react";

const points = [
  {
    Icon: Users,
    accent: "bg-emerald-50 text-emerald-600 ring-emerald-100",
    title: "Shared view",
    description: "Everyone on your family plan sees the same numbers.",
  },
  {
    Icon: PieChart,
    accent: "bg-indigo-50 text-indigo-600 ring-indigo-100",
    title: "Clarity at a glance",
    description: "Monthly trends and category breakdowns, no spreadsheets.",
  },
  {
    Icon: ShieldCheck,
    accent: "bg-amber-50 text-amber-600 ring-amber-100",
    title: "Yours to keep",
    description: "Your data isn't sold, tracked, or used to advertise.",
  },
];

export default function LoginHeroSection() {
  return (
    <div className="space-y-8">
      <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        Welcome back
      </span>

      <div>
        <h1 className="text-4xl font-semibold tracking-tight text-gray-900 lg:text-[44px] lg:leading-[1.1]">
          Your family&rsquo;s finances, <br className="hidden lg:block" />
          right where you left them.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-gray-600">
          Pick up where you stopped. FamLedger keeps your income, expenses, and
          shared plan in sync across every family member.
        </p>
      </div>

      <ul className="space-y-4">
        {points.map(({ Icon, accent, title, description }) => (
          <li key={title} className="flex items-start gap-3">
            <span
              className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ring-1 ${accent}`}
            >
              <Icon className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-semibold text-gray-900">{title}</p>
              <p className="mt-0.5 text-sm leading-relaxed text-gray-600">
                {description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
