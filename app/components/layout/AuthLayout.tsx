import React from "react";
import Link from "next/link";
import { PiggyBank } from "lucide-react";

type AuthLayoutProps = {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
};

/**
 * Split-panel auth layout. Left panel carries marketing/context (hidden on
 * mobile so the form dominates). Right panel holds the form itself.
 * Background: white with a soft emerald wash on the left side so it feels
 * continuous with the landing page aesthetic.
 */
function AuthLayout({ leftContent, rightContent }: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen w-full bg-white">
      {/* Logo top-left — visible on all breakpoints for brand continuity. */}
      <Link
        href="/"
        className="absolute left-6 top-6 z-10 flex items-center gap-2.5"
      >
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 ring-1 ring-emerald-100 text-emerald-600">
          <PiggyBank className="h-6 w-6" />
        </span>
        <span className="text-xl font-semibold tracking-tight text-gray-900">
          FamLedger
        </span>
      </Link>

      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        {/* Left — context panel (hidden on mobile) */}
        <div className="relative hidden items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-50/80 via-white to-indigo-50/60 px-6 py-10 lg:flex lg:px-16">
          {/* Subtle dot pattern */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, #0f172a 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="relative w-full max-w-lg pt-16">{leftContent}</div>
        </div>

        {/* Right — form panel */}
        <div className="flex items-center justify-center px-6 py-20 sm:px-10 lg:px-16 lg:py-10">
          <div className="w-full max-w-md">{rightContent}</div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
