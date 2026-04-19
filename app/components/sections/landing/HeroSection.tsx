import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import DashboardPreview from "./DashboardPreview";

const HeroSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* Soft emerald wash behind the hero; fades to white. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-gradient-to-b from-emerald-50/60 via-white to-white"
      />
      {/* Subtle grid pattern for depth (very low opacity). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse at top, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at top, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 75%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 sm:pb-24 sm:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Family finance, done together
            </span>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-[56px] lg:leading-[1.05]">
              See where your family&rsquo;s money actually goes.
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-relaxed text-gray-600">
              FamLedger brings your household&rsquo;s income and expenses into
              one shared view &mdash; so every member knows the plan, and nothing
              slips through the cracks.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
              >
                Get started free
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-50"
              >
                Log in
              </Link>
            </div>

            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-600">
              <li className="inline-flex items-center gap-1.5">
                <Check className="h-4 w-4 text-emerald-600" />
                No credit card required
              </li>
              <li className="inline-flex items-center gap-1.5">
                <Check className="h-4 w-4 text-emerald-600" />
                Invite your family in one click
              </li>
            </ul>
          </div>

          <div className="lg:col-span-6">
            <DashboardPreview />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
