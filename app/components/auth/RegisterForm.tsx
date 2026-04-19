"use client";

import React, { useState } from "react";
import { Input } from "../ui/Input";
import Button from "../ui/Button";
import { Eye, EyeOff, Home, KeyRound, Lock, Mail, User } from "lucide-react";
import { useRegisterUserMutation } from "@/app/services/api/authAPI";
import { RegisterRequest, RegistrationMode } from "@/app/types/auth";
import { useRouter } from "next/navigation";

const MIN_PASSWORD_LENGTH = 6;

type FormError = {
  [fieldName: string]: string;
};

function RegisterForm() {
  const router = useRouter();

  const [registrationMode, setRegistrationMode] =
    useState<RegistrationMode>("createFamily");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [invitationCode, setInvitationCode] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState<FormError>({});
  const [apiError, setApiError] = useState<string | null>(null);

  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const validateForm = () => {
    const errors: FormError = {};

    if (!name.trim()) errors.name = "Full name is required.";
    if (!email.trim()) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email format.";
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      errors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
    }

    if (confirmPassword !== password) {
      errors.confirmPassword = "Passwords do not match.";
    }

    if (registrationMode === "createFamily" && !familyName.trim()) {
      errors.familyName = "Family name is required.";
    }

    if (registrationMode === "joinFamily" && !invitationCode.trim()) {
      errors.invitationCode = "Invitation code is required.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiError(null);

    if (!validateForm()) {
      return;
    }

    const userData: RegisterRequest = {
      fullName: name.trim(),
      email: email.trim(),
      password,
      registrationMode,
      ...(registrationMode === "createFamily"
        ? { familyName: familyName.trim() }
        : { invitationCode: invitationCode.trim() }),
    };

    try {
      await registerUser(userData).unwrap();
      router.push("/login");
    } catch (error: unknown) {
      console.error("Registration Error:", error);
      const err = error as { data?: string | { message?: string } };
      const msg =
        typeof err.data === "string"
          ? err.data
          : err.data?.message ?? "Registration failed. Please try again.";
      setApiError(msg);
    }
  };

  const PasswordToggleIcon = showPassword ? EyeOff : Eye;

  return (
    <form onSubmit={handleOnSubmit} className="space-y-5">
      {apiError && (
        <div className="rounded-lg bg-white p-3 text-sm text-rose-700 ring-1 ring-rose-200">
          {apiError}
        </div>
      )}

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => {
            setRegistrationMode("createFamily");
            setApiError(null);
          }}
          className={`flex flex-col items-start rounded-xl border p-3 text-left transition ${
            registrationMode === "createFamily"
              ? "border-indigo-500 bg-indigo-50/60 text-indigo-800 ring-1 ring-indigo-200"
              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
          }`}
        >
          <span className="flex items-center gap-2 font-semibold text-sm">
            <Home className="h-4 w-4 shrink-0" />
            Create family
          </span>
          <span className="mt-1 text-xs text-gray-500">You are the admin</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setRegistrationMode("joinFamily");
            setApiError(null);
          }}
          className={`flex flex-col items-start rounded-xl border p-3 text-left transition ${
            registrationMode === "joinFamily"
              ? "border-indigo-500 bg-indigo-50/60 text-indigo-800 ring-1 ring-indigo-200"
              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
          }`}
        >
          <span className="flex items-center gap-2 font-semibold text-sm">
            <KeyRound className="h-4 w-4 shrink-0" />
            Join with code
          </span>
          <span className="mt-1 text-xs text-gray-500">From your admin</span>
        </button>
      </div>

      <Input
        label="Full name"
        placeholder="John Doe"
        icon={<User className="w-4 h-4" />}
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={formErrors.name}
      />

      <Input
        label="Email"
        placeholder="you@example.com"
        type="email"
        icon={<Mail className="w-4 h-4" />}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={formErrors.email}
      />

      {registrationMode === "createFamily" && (
        <Input
          label="Family name"
          placeholder="e.g. The Sharma Family"
          icon={<Home className="w-4 h-4" />}
          value={familyName}
          onChange={(e) => setFamilyName(e.target.value)}
          error={formErrors.familyName}
        />
      )}

      {registrationMode === "joinFamily" && (
        <Input
          label="Invitation code"
          placeholder="Paste the code from your family admin"
          icon={<KeyRound className="w-4 h-4" />}
          value={invitationCode}
          onChange={(e) => setInvitationCode(e.target.value)}
          error={formErrors.invitationCode}
        />
      )}

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

      <Input
        label="Confirm password"
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

      <div className="text-xs text-gray-500 text-center">
        You must belong to a family — create one or use an invite code from an
        admin.
      </div>

      <Button
        isLoading={isLoading}
        type="submit"
        variant="primary"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? "Creating account…" : "Create account"}
      </Button>

      <p className="text-xs text-gray-500 text-center">
        By signing up, you agree to our{" "}
        <a href="#" className="font-medium text-gray-700 underline decoration-gray-300 underline-offset-2 hover:text-gray-900 hover:decoration-gray-500">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="font-medium text-gray-700 underline decoration-gray-300 underline-offset-2 hover:text-gray-900 hover:decoration-gray-500">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}

export default RegisterForm;
