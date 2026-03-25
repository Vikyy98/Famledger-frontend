import React from "react";
import { PiggyBank } from "lucide-react";
import LoginForm from "../../auth/LoginForm";
import Link from "next/link";

export default function LoginSection() {
  return (
    <div className="space-y-6 border bg-white p-8 rounded-2xl shadow-sm">
      {/* Logo / Icon */}
      <div className="flex justify-center">
        <div className="bg-blue-100 p-3 rounded-full">
          <PiggyBank className="text-blue-600 w-6 h-6" />
        </div>
      </div>

      {/* Headings */}
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-semibold text-gray-900">Welcome Back!</h2>
        <p className="text-gray-500 text-sm">
          Continue your journey to financial wellness
        </p>
      </div>

      {/* Login Form */}
      <LoginForm />

      {/* Divider */}
      <div className="border-t my-3" />

      {/* Footer Links */}
      <div className="flex flex-col space-y-2 text-center text-sm text-gray-600">
        <span className="border-l-">New to FamLedger? </span>

        <Link
          href="/register"
          className="border rounded-lg border-blue-600 bg-white py-2 hover:bg-blue-600 hover:text-white  text-blue-600 font-medium"
        >
          Create Free Account
        </Link>
      </div>

      {/* Bottom Info (optional small tagline) */}
      <div className="text-center text-xs text-gray-400 mt-3">
        Secure • Free Forever • Family Friendly
      </div>
    </div>
  );
}
