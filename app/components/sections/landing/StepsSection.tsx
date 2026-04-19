const steps = [
  {
    n: "01",
    title: "Create your account",
    description:
      "Sign up in under a minute. Your family workspace is ready before your chai is.",
  },
  {
    n: "02",
    title: "Invite your family",
    description:
      "Share a one-tap invite code. Each member joins as admin or contributor — you decide.",
  },
  {
    n: "03",
    title: "Start tracking together",
    description:
      "Log income, log expenses, and watch the trends build. The dashboard tells the story.",
  },
];

const StepsSection = () => {
  return (
    <section className="w-full bg-gray-50 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-wider text-indigo-700">
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            Three steps to a shared financial picture.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {steps.map(({ n, title, description }) => (
            <div
              key={n}
              className="rounded-2xl border border-gray-200 bg-white p-6"
            >
              <span className="inline-flex items-center justify-center rounded-lg bg-white px-2.5 py-1 text-sm font-semibold tabular-nums text-gray-900 ring-1 ring-gray-200">
                {n}
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

export default StepsSection;
