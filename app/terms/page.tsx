import type { Metadata } from "next";
import Link from "next/link";
import PublicNav from "../components/layout/PublicNav";
import Footer from "../components/layout/Footer";

export const metadata: Metadata = {
  title: "Terms of Service · FamLedger",
  description: "The terms for using FamLedger during its beta.",
};

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <PublicNav />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6">
        <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
        <p className="mt-2 text-sm text-gray-500">Last updated: 10 June 2026</p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-gray-700">
          <section className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-800">
            <p className="font-semibold">FamLedger is in beta.</p>
            <p className="mt-1">
              The service is provided as-is while we build it. Features may change
              or break, and data may occasionally be reset. Please do not enter real
              bank credentials, card numbers, or other highly sensitive information.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">1. Using FamLedger</h2>
            <p className="mt-2">
              FamLedger helps families track shared income, expenses, and debts. You
              are responsible for the accuracy of the information you enter and for
              keeping your account credentials secure.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">2. Your account</h2>
            <p className="mt-2">
              You must provide a valid email address to register. You are responsible
              for activity under your account. Do not share your password or attempt to
              access families or data that are not yours.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">3. Acceptable use</h2>
            <p className="mt-2">
              Do not misuse the service, attempt to disrupt it, or use it for unlawful
              purposes. We may suspend accounts that abuse the platform.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">4. No financial advice</h2>
            <p className="mt-2">
              FamLedger is a tracking tool, not a financial advisor. Any summaries or
              insights are informational only.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">5. Liability</h2>
            <p className="mt-2">
              To the extent permitted by law, FamLedger is provided without warranties
              and we are not liable for any loss arising from use of the beta service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">6. Changes</h2>
            <p className="mt-2">
              We may update these terms as the product evolves. Continued use after an
              update means you accept the revised terms.
            </p>
          </section>

          <p className="text-gray-600">
            Questions? See our{" "}
            <Link href="/privacy" className="font-medium text-indigo-600 hover:text-indigo-700">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
