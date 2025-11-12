import React from "react";
import RegisterForm from "../auth/RegisterForm";
import { Wallet } from "lucide-react";
import Link from "next/link";

function RegisterSection() {
  return (
    <div className="space-y-4 border bg-white p-8 rounded-lg shadow-md">
      {/* Logo */}
      {/* <div className="flex justify-center">
        <div className="bg-blue-100 p-3 rounded-full">
          <Wallet className="text-blue-600 w-6 h-6" />
        </div>
      </div> */}

      {/* Heading */}
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-semibold text-gray-900">
          Create Your Account
        </h2>
        <p className="text-gray-500 text-sm">
          Start managing your family finances today
        </p>
      </div>

      {/* Register Form */}
      <RegisterForm />

      {/* Footer Link */}
      <div className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-blue-600 font-medium hover:underline"
        >
          Sign In Instead
        </Link>
      </div>
    </div>
  );
}

export default RegisterSection;
