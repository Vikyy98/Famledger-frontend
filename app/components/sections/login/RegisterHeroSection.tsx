import { Rocket, Users, PieChart, ShieldCheck } from "lucide-react";

const points = [
  {
    Icon: Rocket,
    accent: "bg-emerald-50 text-emerald-600 ring-emerald-100",
    title: "Set up in under a minute",
    description: "Create your family workspace and invite members in one flow.",
  },
  {
    Icon: Users,
    accent: "bg-indigo-50 text-indigo-600 ring-indigo-100",
    title: "Everyone on the same page",
    description: "Shared income, expenses, and visibility for all members.",
  },
  {
    Icon: PieChart,
    accent: "bg-amber-50 text-amber-600 ring-amber-100",
    title: "Insight without the spreadsheets",
    description: "Automatic monthly trends and category breakdowns.",
  },
  {
    Icon: ShieldCheck,
    accent: "bg-rose-50 text-rose-600 ring-rose-100",
    title: "Your data stays yours",
    description: "No ads, no tracking pixels, no hidden upsells.",
  },
];

function RegisterHeroSection() {
  return (
    <div className="space-y-8">
      <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        Start free &middot; No credit card
      </span>

      <div>
        <h1 className="text-4xl font-semibold tracking-tight text-gray-900 lg:text-[44px] lg:leading-[1.1]">
          Bring your family onto one shared plan.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-gray-600">
          Create an account, invite your household, and see where money is
          flowing &mdash; all in a single shared view.
        </p>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2">
        {points.map(({ Icon, accent, title, description }) => (
          <li
            key={title}
            className="rounded-xl border border-gray-200 bg-white/70 p-4 backdrop-blur"
          >
            <span
              className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ring-1 ${accent}`}
            >
              <Icon className="h-4 w-4" />
            </span>
            <p className="mt-3 text-sm font-semibold text-gray-900">{title}</p>
            <p className="mt-1 text-xs leading-relaxed text-gray-600">
              {description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RegisterHeroSection;
