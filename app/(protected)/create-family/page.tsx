"use client";

import { useState } from "react";
import { KeyRound, Users, ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { useAppDispatch } from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";
import Button from "@/app/components/ui/Button";
import { useCreateFamilyMutation } from "@/app/services/api/familyAPI";
import { setUserFamilyId } from "@/app/services/slices/authSlice";

export default function CreateFamilyPage() {
  const [activeTab, setActiveTab] = useState<"create" | "join">("create");
  const [familyName, setFamilyName] = useState("");
  const [localError, setLocalError] = useState("");

  const [createFamily, { isLoading, error }] = useCreateFamilyMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const validateInputs = () => {
    if (activeTab === "create" && familyName.trim() === "") {
      setLocalError("Family name is required.");
      return false;
    }
    setLocalError("");
    return true;
  };

  const handleFamilyCreation = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (!validateInputs()) return;
    if (activeTab === "join") return;

    try {
      const response = await createFamily({
        familyName: familyName.trim(),
      }).unwrap();
      dispatch(setUserFamilyId(response.familyId));
      router.push("/dashboard");
    } catch (err) {
      console.log("API Error:", err);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-emerald-50/80 via-white to-indigo-50/60">
      {/* Subtle dot pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #0f172a 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-4 py-16 sm:px-6">
        <div className="space-y-8">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              One more step
            </span>
            <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
              Set up your family workspace
            </h1>
            <p className="text-base leading-relaxed text-gray-600">
              Create a new family or join an existing one to start tracking
              finances together.
            </p>
          </div>

          {/* Tab selector */}
          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => {
                setActiveTab("create");
                setLocalError("");
              }}
              className={`flex flex-col items-start rounded-xl border p-4 text-left transition-colors ${
                activeTab === "create"
                  ? "border-indigo-500 bg-indigo-50/60 ring-1 ring-indigo-200"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 ring-1 ring-emerald-100 text-emerald-600">
                <Users className="h-4 w-4" />
              </span>
              <span className="mt-3 text-sm font-semibold text-gray-900">
                Create a family
              </span>
              <span className="mt-0.5 text-xs text-gray-500">
                You become the admin
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab("join");
                setLocalError("");
              }}
              className={`flex flex-col items-start rounded-xl border p-4 text-left transition-colors ${
                activeTab === "join"
                  ? "border-indigo-500 bg-indigo-50/60 ring-1 ring-indigo-200"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 ring-1 ring-indigo-100 text-indigo-600">
                <KeyRound className="h-4 w-4" />
              </span>
              <span className="mt-3 text-sm font-semibold text-gray-900">
                Join a family
              </span>
              <span className="mt-0.5 text-xs text-gray-500">
                Use an invite code
              </span>
            </button>
          </div>

          {/* Panel content */}
          {activeTab === "create" ? (
            <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6">
              <div className="space-y-2">
                <label
                  htmlFor="familyName"
                  className="text-sm font-medium text-gray-700"
                >
                  Family name
                </label>
                <input
                  id="familyName"
                  type="text"
                  placeholder="e.g., The Sharma Family"
                  className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 ${
                    localError && familyName.trim() === ""
                      ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/20"
                      : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500/20"
                  }`}
                  onChange={(e) => setFamilyName(e.target.value)}
                  value={familyName}
                />
                {localError && (
                  <p className="text-sm text-rose-600">{localError}</p>
                )}
              </div>

              <Button
                onClick={handleFamilyCreation}
                variant="primary"
                isLoading={isLoading}
                disabled={isLoading}
                className="w-full sm:w-auto"
              >
                {isLoading ? "Creating…" : (
                  <span className="inline-flex items-center gap-2">
                    Create family
                    <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </Button>

              <p className="text-xs text-gray-500">
                You can invite family members from the Members page after setup.
              </p>
            </div>
          ) : (
            <div className="space-y-3 rounded-2xl border border-gray-200 bg-white p-6">
              <p className="text-sm leading-relaxed text-gray-700">
                Joining a family happens at{" "}
                <strong className="font-semibold">registration</strong>. Ask your
                family admin for an invitation code (Members → Generate new
                code), then{" "}
                <Link
                  href="/register"
                  className="font-medium text-indigo-600 hover:text-indigo-700"
                >
                  create an account
                </Link>{" "}
                and pick <strong className="font-semibold">Join with code</strong>.
              </p>
              <p className="text-xs text-gray-500">
                Already have an account without a family? Contact an admin —
                this screen is only for creating a new family while logged in.
              </p>
            </div>
          )}

          {error && (
            <div className="rounded-lg bg-white p-3 text-sm text-rose-700 ring-1 ring-rose-200">
              Something went wrong. Please try again.
            </div>
          )}

          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-gray-500">
            <li className="inline-flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-emerald-600" />
              Invite up to your whole household
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-emerald-600" />
              Shared income &amp; expense view
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
