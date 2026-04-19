"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "../ui/Input";
import Button from "../ui/Button";
import Link from "next/link";
import { useLoginUserMutation } from "@/app/services/api/authAPI";
import { LoginRequest } from "@/app/types/auth";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/app/hooks/useAuth";
import { setUserDetails } from "@/app/services/slices/authSlice";

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Local state for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Local state for validation errors
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // State for displaying general API errors (e.g., "Invalid credentials")
  const [apiError, setApiError] = useState("");

  // RTK Query Mutation Hook
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");
    setApiError("");

    let hasError = false;

    if (!email || email.length === 0) {
      setEmailError("Please enter a valid email address");
      hasError = true;
    }

    if (!password) {
      setPasswordError("Please enter a valid password");
      hasError = true;
    } else if (password.length < 6) {
      // Added minimum length check for better security/feedback
      setPasswordError("Password must be at least 6 characters long");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const userLoginDetails: LoginRequest = {
      email: email,
      password: password,
    };

    try {
      const response = await loginUser(userLoginDetails).unwrap();
      console.log("Login successful", response.user);
      dispatch(setUserDetails(response));

      const familyId = response.user.familyId ?? 0;
      const hasFamily =
        familyId > 0 && response.user.familyName != null && response.user.familyName !== "";

      if (!hasFamily) {
        router.push("/create-family");
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      console.log("Login failed", error);
      setApiError("Login failed. Please check your credentials and try again.");
    }
  };

  const PasswordToggleIcon = showPassword ? EyeOff : Eye;

  return (
    <form className="space-y-5" onSubmit={handleLogin}>
      {apiError && (
        <div className="rounded-lg bg-white p-3 text-sm text-rose-700 ring-1 ring-rose-200">
          {apiError}
        </div>
      )}

      {/* Email Input */}
      <Input
        label="Email Address"
        placeholder="you@example.com"
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={emailError}
      />

      {/* Password Input */}
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Forgot?
          </Link>
        </div>
        <Input
          placeholder="Enter your password"
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={passwordError}
          actionIcon={
            <PasswordToggleIcon
              className="w-4 h-4 cursor-pointer text-gray-400 hover:text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            />
          }
        />
      </div>

      {/* Sign-in Button */}
      <Button
        className="w-full"
        variant="primary"
        isLoading={isLoading}
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Logging in…" : "Log in"}
      </Button>
    </form>
  );
}
