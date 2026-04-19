import React from "react";
import Link from "next/link";
import RegisterForm from "../../auth/RegisterForm";

function RegisterSection() {
  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
          Create your account
        </h2>
        <p className="text-sm text-gray-600">
          Start managing your family&rsquo;s finances in one shared workspace.
        </p>
      </div>

      <RegisterForm />

      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-indigo-600 hover:text-indigo-700"
        >
          Log in
        </Link>
      </p>
    </div>
  );
}

export default RegisterSection;
