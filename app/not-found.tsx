import Link from "next/link";
import Logo from "./components/layout/Logo";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <Logo className="h-12 w-12" />
      <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-indigo-600">
        404
      </p>
      <h1 className="mt-2 text-2xl font-bold text-gray-900">Page not found</h1>
      <p className="mt-2 max-w-sm text-sm text-gray-500">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
      >
        Back to home
      </Link>
    </div>
  );
}
