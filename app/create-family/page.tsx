"use client";

import Image from "next/image";
import { useState } from "react";
import { Link, Users } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../hooks/useAuth";
import { FamilyRequest } from "../types/family";
import { useRouter } from "next/navigation";
import Button from "../components/ui/Button";
import { useCreateFamilyMutation } from "../services/api/familyAPI";
import { setFamilyDetails } from "../services/slices/familySlice";

export default function CreateFamilySection() {
  const [activeTab, setActiveTab] = useState<"create" | "join">("create");
  const [familyName, setFamilyName] = useState("");
  const [invitationLink, setInvitationLink] = useState("");
  const [localError, setLocalError] = useState("");

  const [createFamily, { isLoading, error }] = useCreateFamilyMutation();
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const validateInputs = () => {
    if (activeTab === "create" && familyName.trim() === "") {
      setLocalError("Family name is required.");
      return false;
    }

    if (activeTab === "join" && invitationLink.trim() === "") {
      setLocalError("Invitation link is required.");
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

    const inputType = activeTab === "create" ? 1 : 2;

    const familyDetails: FamilyRequest = {
      userId: user?.userId,
      familyName,
      invitationLink,
      familyDetailType: inputType,
    };

    try {
      const response = await createFamily(familyDetails).unwrap();
      dispatch(setFamilyDetails(response));
      router.push("/dashboard");
    } catch (err) {
      console.log("API Error:", err);
    }
  };

  return (
    <div className="flex items-center justify-between max-w-7xl mx-auto py-24 px-6">
      {/* LEFT SIDE */}
      <div className="w-[55%] space-y-8">
        {/* Title */}
        <div className="space-y-1">
          <h1 className="text-5xl font-bold leading-tight">
            {"Let's"} start tracking your <br /> family expenses
          </h1>

          <p className="text-gray-600 text-lg max-w-xl">
            Take control of your family finances. Track income, expenses, and
            achieve goals together.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4">
          <button
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
              <Link />
              <span className="font-semibold">Join Family</span>
            </div>
            <span className="text-gray-500 text-sm mt-1">Use invite link</span>
          </button>
        </div>

        {/* Input Forms */}
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
              You can invite family members after setup
            </p>
          </div>
        )}

        {activeTab === "join" && (
          <div className="space-y-3">
            <label className="text-gray-800 font-medium">Invitation Link</label>

            <input
              type="text"
              placeholder="Paste your invite link"
              className={`w-full border rounded-xl px-4 py-3 text-gray-700 focus:ring-2 focus:outline-none
                ${
                  localError && invitationLink.trim() === ""
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-500"
                }
              `}
              onChange={(e) => setInvitationLink(e.target.value)}
              value={invitationLink}
            />

            {localError && <p className="text-red-500 text-sm">{localError}</p>}

            <Button
              className="w-48"
              onClick={handleFamilyCreation}
              variant="primary"
              isLoading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? "Joining..." : "Join Family →"}
            </Button>
          </div>
        )}

        {/* API error (from server) */}
        {error && (
          <p className="text-red-600 text-sm mt-2">Something went wrong!</p>
        )}
      </div>

      {/* RIGHT SIDE IMAGE */}
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
