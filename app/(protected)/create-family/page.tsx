"use client";

import Image from "next/image";
import { useState } from "react";
import { Link as LinkIcon, Users } from "lucide-react";
import Link from "next/link";
import { useAppDispatch } from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";
import Button from "@/app/components/ui/Button";
import { useCreateFamilyMutation } from "@/app/services/api/familyAPI";
import { setUserFamilyId } from "@/app/services/slices/authSlice";

export default function CreateFamilySection() {
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

    if (activeTab === "join") {
      return;
    }

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
    <div className="flex items-center justify-between max-w-7xl mx-auto py-24 px-6">
      <div className="w-[55%] space-y-8">
        <div className="space-y-1">
          <h1 className="text-5xl font-bold leading-tight">
            {"Let's"} start tracking your <br /> family expenses
          </h1>

          <p className="text-gray-600 text-lg max-w-xl">
            Take control of your family finances. Track income, expenses, and
            achieve goals together.
          </p>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => {
              setActiveTab("create");
              setLocalError("");
            }}
            className={`w-48 p-4 rounded-xl border flex flex-col items-start transition
              ${
                activeTab === "create"
                  ? "bg-blue-50 border-blue-500 text-blue-600"
                  : "border-gray-300 hover:bg-gray-100"
              }
            `}
          >
            <div className="flex items-center gap-2">
              <Users />
              <span className="font-semibold">Create Family</span>
            </div>
            <span className="text-gray-500 text-sm mt-1">Start fresh</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("join");
              setLocalError("");
            }}
            className={`w-48 p-4 rounded-xl border flex flex-col items-start transition
              ${
                activeTab === "join"
                  ? "bg-blue-50 border-blue-500 text-blue-600"
                  : "border-gray-300 hover:bg-gray-100"
              }
            `}
          >
            <div className="flex items-center gap-2">
              <LinkIcon />
              <span className="font-semibold">Join Family</span>
            </div>
            <span className="text-gray-500 text-sm mt-1">Use code at register</span>
          </button>
        </div>

        {activeTab === "create" && (
          <div className="space-y-3">
            <label className="text-gray-800 font-medium">Family Name</label>

            <input
              type="text"
              placeholder="e.g., The Sharma Family"
              className={`w-full border rounded-xl px-4 py-3 text-gray-700 focus:ring-2 focus:outline-none
                ${
                  localError && familyName.trim() === ""
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-500"
                }
              `}
              onChange={(e) => setFamilyName(e.target.value)}
              value={familyName}
            />

            {localError && <p className="text-red-500 text-sm">{localError}</p>}

            <Button
              className="w-48"
              onClick={handleFamilyCreation}
              variant="primary"
              isLoading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Family →"}
            </Button>

            <p className="text-gray-500 text-sm mt-1">
              You can invite family members from the Members page after setup.
            </p>
          </div>
        )}

        {activeTab === "join" && (
          <div className="space-y-4 rounded-xl border border-gray-200 bg-gray-50 p-5">
            <p className="text-gray-700">
              Joining happens at <strong>registration</strong>. Ask your family admin for an
              invitation code (Members → Generate new code), then{" "}
              <Link href="/register" className="text-blue-600 font-medium underline">
                create an account
              </Link>{" "}
              and choose <strong>Join with code</strong>.
            </p>
            <p className="text-sm text-gray-500">
              If you already have an account without a family, contact support or ask an admin —
              this screen is for creating a new family while logged in.
            </p>
          </div>
        )}

        {error && (
          <p className="text-red-600 text-sm mt-2">Something went wrong!</p>
        )}
      </div>

      <div className="w-[45%] flex justify-center">
        <Image
          src="/family-illustration.png"
          alt="Family Illustration"
          width={500}
          height={400}
          className="object-contain"
        />
      </div>
    </div>
  );
}
