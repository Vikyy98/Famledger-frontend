import React from "react";
import Link from "next/link";
import LoginForm from "../../auth/LoginForm";

export default function LoginSection() {
  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
          Log in to FamLedger
        </h2>
        <p className="text-sm text-gray-600">
          Continue tracking your family&rsquo;s finances together.
        </p>
      </div>

      <LoginForm />

      <div className="relative">
        <div
          aria-hidden
          className="absolute inset-0 flex items-center"
        >
          <span className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white px-2 text-gray-500">
            New to FamLedger?
          </span>
        </div>
      </div>

      <Link
        href="/register"
        className="flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-50"
      >
        Create a free account
      </Link>

      <p className="text-center text-xs text-gray-500">
        No credit card required
      </p>
    </div>
  );
}
