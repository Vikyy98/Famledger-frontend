import { Users, PieChart, ShieldCheck } from "lucide-react";

const features = [
  {
    Icon: Users,
    accent: "bg-emerald-50 text-emerald-600 ring-emerald-100",
    title: "One shared view",
    description:
      "Invite your partner, parents, or roommates. Everyone sees the same income and spending picture — no more \"did you pay the rent?\"",
  },
  {
    Icon: PieChart,
    accent: "bg-indigo-50 text-indigo-600 ring-indigo-100",
    title: "Spending clarity, not spreadsheets",
    description:
      "Category breakdowns, monthly trends, and recurring income surfaced automatically. Skip the Excel ritual.",
  },
  {
    Icon: ShieldCheck,
    accent: "bg-amber-50 text-amber-600 ring-amber-100",
    title: "Private by default",
    description:
      "Your family's financial data stays yours. No tracking pixels, no selling data to advertisers, no hidden upsells.",
  },
];

const FeatureSection = () => {
  return (
    <section className="w-full bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-wider text-emerald-700">
            What you get
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            Everything your household needs &mdash; nothing it doesn&rsquo;t.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-600">
            FamLedger focuses on the three things that actually move the needle
            for family finances: visibility, collaboration, and trust.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ Icon, accent, title, description }) => (
            <div
              key={title}
              className="rounded-2xl border border-gray-200 bg-white p-6 transition-colors hover:border-gray-300"
            >
              <span
                className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ring-1 ${accent}`}
              >
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold tracking-tight text-gray-900">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
