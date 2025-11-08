import React from "react";
import { Input } from "../ui/Input";
import Button from "../ui/Button";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";

export const RegisterForm = () => {
  return (
    <form className="space-y-5">
      {/* Full Name */}
      <Input
        label="Full Name"
        placeholder="John Doe"
        icon={<User className="w-4 h-4" />}
      />

      {/* Email */}
      <Input
        label="Email Address"
        placeholder="you@example.com"
        type="email"
        icon={<Mail className="w-4 h-4" />}
      />

      {/* Password */}
      <Input
        label="Password"
        placeholder="At least 6 characters"
        type="password"
        icon={<Lock className="w-4 h-4" />}
      />

      {/* Confirm Password */}
      <Input
        label="Confirm Password"
        placeholder="Re-enter password"
        type="password"
        icon={<Lock className="w-4 h-4" />}
      />

      {/* Info text */}
      <div className="text-xs text-gray-500 text-center">
        Free forever • No credit card required • Cancel anytime
      </div>

      {/* Submit Button */}
      <Button type="submit" variant="primary" className="w-full">
        Create Free Account
      </Button>

      {/* Terms Note */}
      <p className="text-xs text-gray-500 text-center">
        By signing up, you agree to our{" "}
        <a href="#" className="text-blue-600 underline hover:text-blue-700">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="text-blue-600 underline hover:text-blue-700">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
};
