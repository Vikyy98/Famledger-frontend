import Link from "next/link";
import { ArrowRight } from "lucide-react";

const FinalCTASection = () => {
  return (
    <section className="w-full bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-br from-emerald-50 via-white to-indigo-50 px-6 py-14 text-center sm:px-12 sm:py-16">
          {/* Accent dots */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, #0f172a 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative">
            <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
              Ready to bring your family on the same page?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-600">
              Start free, invite your family in seconds, and see your shared
              financial picture within a minute of signing up.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
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
                I already have an account
              </Link>
            </div>

            <p className="mt-5 text-xs text-gray-500">
              No credit card required
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
