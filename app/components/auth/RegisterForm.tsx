"use client";

import React, { useState } from "react";
import { Input } from "../ui/Input";
import Button from "../ui/Button";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useRegisterUserMutation } from "@/app/services/api/authAPI";
import { RegisterRequest } from "@/app/types/auth";
import { useRouter } from "next/navigation";

// --- Constants for Validation ---
const MIN_PASSWORD_LENGTH = 6;

type FormError = {
  [fieldName: string]: string;
};

function RegisterForm() {
  const router = useRouter();

  // Input State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // UI/Validation State
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState<FormError>({});
  const [apiError, setApiError] = useState<string | null>(null);

  // RTK Query Mutation Hook
  const [registerUser, { data, isSuccess, isLoading }] =
    useRegisterUserMutation();

  // Client-Side Validation Logic
  const validateForm = () => {
    const errors: FormError = {};

    if (!name.trim()) errors.name = "Full Name is required.";
    if (!email.trim()) {
      errors.email = "Email Address is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email format.";
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      errors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
    }

    if (confirmPassword !== password) {
      errors.confirmPassword = "Passwords do not match.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submission Handler
  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiError(null);

    if (!validateForm()) {
      return;
    }

    const userData: RegisterRequest = {
      fullName: name.trim(),
      familyName: "",
      email: email.trim(),
      password: password,
      role: "Admin",
    };

    try {
      await registerUser(userData).unwrap();
      //Route to dashboard
      router.push("/login");
    } catch (error) {
      console.error("Registration Error:", error);
      setApiError("Registration failed. Please try again.");
    }
  };

  const PasswordToggleIcon = showPassword ? EyeOff : Eye;

  return (
    <form onSubmit={handleOnSubmit} className="space-y-5">
      {apiError && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
          {apiError}
        </div>
      )}

      {/* Full Name */}
      <Input
        label="Full Name"
        placeholder="John Doe"
        icon={<User className="w-4 h-4" />}
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={formErrors.name}
      />

      {/* Email */}
      <Input
        label="Email Address"
        placeholder="you@example.com"
        type="email"
        icon={<Mail className="w-4 h-4" />}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={formErrors.email}
      />

      {/* Password */}
      <Input
        label="Password"
        placeholder={`At least ${MIN_PASSWORD_LENGTH} characters`}
        type={showPassword ? "text" : "password"}
        icon={<Lock className="w-4 h-4" />}
        actionIcon={
          <PasswordToggleIcon
            className="w-4 h-4 cursor-pointer text-gray-400 hover:text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          />
        }
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={formErrors.password}
      />

      {/* Confirm Password */}
      <Input
        label="Confirm Password"
        placeholder="Re-enter password"
        type={showPassword ? "text" : "password"}
        icon={<Lock className="w-4 h-4" />}
        actionIcon={
          <PasswordToggleIcon
            className="w-4 h-4 cursor-pointer text-gray-400 hover:text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          />
        }
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={formErrors.confirmPassword}
      />

      {/* Info text */}
      <div className="text-xs text-gray-500 text-center">
        Free forever • No credit card required • Cancel anytime
      </div>

      {/* Submit Button */}
      <Button
        isLoading={isLoading}
        type="submit"
        variant="primary"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? "Registering..." : "Create New Account"}
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
}

export default RegisterForm;
