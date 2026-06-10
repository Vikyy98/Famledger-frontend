"use client";

import { useEffect } from "react";
import Link from "next/link";
import Logo from "./components/layout/Logo";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface to the console for debugging; never shown to the user.
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <Logo className="h-12 w-12" />
      <h1 className="mt-6 text-2xl font-bold text-gray-900">
        Something went wrong
      </h1>
      <p className="mt-2 max-w-sm text-sm text-gray-500">
        An unexpected error occurred. You can try again, or head back to safety.
      </p>
      <div className="mt-6 flex items-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
