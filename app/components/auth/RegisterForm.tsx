"use client";

import React, { useState } from "react";
import { Input } from "../ui/Input";
import Button from "../ui/Button";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useAppDispatch } from "@/src/hooks/useAuth";
import { useRegisterUserMutation } from "@/src/auth/authAPI";
import { RegisterRequest } from "@/src/auth/type";

export const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const disptach = useAppDispatch();
  const [registerUser, { data, error, isLoading }] = useRegisterUserMutation();

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ name, email, password, confirmPassword });

    const userData: RegisterRequest = {
      fullName: name,
      familyName: "",
      email: email,
      password: password,
      role: "Admin",
    };

    const respone = registerUser(userData).unwrap();
    console.log("Registration successful:", data);
    console.log("Registration Unsuccessful:", error);
  };

  return (
    <form onSubmit={(e) => handleOnSubmit(e)} className="space-y-5">
      {/* Full Name */}
      <Input
        label="Full Name"
        placeholder="John Doe"
        icon={<User className="w-4 h-4" />}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* Email */}
      <Input
        label="Email Address"
        placeholder="you@example.com"
        type="email"
        icon={<Mail className="w-4 h-4" />}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* Password */}
      <Input
        label="Password"
        placeholder="At least 6 characters"
        type="password"
        icon={<Lock className="w-4 h-4" />}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* Confirm Password */}
      <Input
        label="Confirm Password"
        placeholder="Re-enter password"
        type="password"
        icon={<Lock className="w-4 h-4" />}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
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
};
