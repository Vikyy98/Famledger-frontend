import type { Metadata } from "next";
import Link from "next/link";
import PublicNav from "../components/layout/PublicNav";
import Footer from "../components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy · FamLedger",
  description: "How FamLedger handles your data during its beta.",
};

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <PublicNav />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6">
        <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
        <p className="mt-2 text-sm text-gray-500">Last updated: 10 June 2026</p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-gray-700">
          <section className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-800">
            <p className="font-semibold">FamLedger is in beta.</p>
            <p className="mt-1">
              We aim to handle your data carefully, but during the beta please avoid
              entering real bank credentials, card numbers, or other highly sensitive
              information.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">What we collect</h2>
            <p className="mt-2">
              Account details (your name and email), and the financial records you
              choose to enter — income, expenses, debts, and family/member information.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">How we use it</h2>
            <p className="mt-2">
              Your data is used only to provide the service to you and your family:
              authentication, and displaying your own ledgers, summaries, and dashboards.
              We do not sell your data.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">Who can see your data</h2>
            <p className="mt-2">
              Financial records are scoped to your family. Only members of your family
              can view your shared records. Your password is stored only as a secure hash.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">Storage & security</h2>
            <p className="mt-2">
              Data is stored in our managed database and transmitted over encrypted
              connections. As a beta, our security measures are still maturing.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">Your choices</h2>
            <p className="mt-2">
              You can stop using the service at any time. To request deletion of your
              account and data during the beta, contact us and we will assist.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">Changes</h2>
            <p className="mt-2">
              We may update this policy as the product evolves. We will update the date
              above when we do.
            </p>
          </section>

          <p className="text-gray-600">
            See also our{" "}
            <Link href="/terms" className="font-medium text-indigo-600 hover:text-indigo-700">
              Terms of Service
            </Link>
            .
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
