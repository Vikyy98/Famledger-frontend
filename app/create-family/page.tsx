"use client";

import Image from "next/image";
import { useState } from "react";
import { Link, Users } from "lucide-react";
import { useAppSelector } from "../hooks/useAuth";
import { useCreateFamilyMutation } from "../services/authAPI";
import { FamilyRequest } from "../types/auth";
import { useRouter } from "next/navigation";
import Button from "../components/ui/Button";

export default function CreateFamilySection() {
  const [activeTab, setActiveTab] = useState<"create" | "join">("create");
  const [familyName, setFamilyName] = useState("");
  const [invitationLink, setInvitationLink] = useState("");
  const [createFamily, { data, isSuccess, error, isLoading }] =
    useCreateFamilyMutation();

  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();

  const handleFamilyCreation = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    const inputType = activeTab == "create" ? 1 : 2;
    console.log(inputType);

    const familyDetails: FamilyRequest = {
      userId: user?.userId,
      familyName: familyName,
      invitationLink: invitationLink,
      familyDetailType: inputType,
    };
    try {
      console.log(familyDetails);
      const response = await createFamily(familyDetails).unwrap;
      if (!response) {
        router.push("/dashboard");
      }
    } catch (error) {}
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
          {/* Create Family tab */}
          <button
            onClick={() => setActiveTab("create")}
            className={`w-48 p-4 rounded-xl border flex flex-col items-start
              ${
                activeTab === "create"
                  ? "bg-blue-50 border-blue-500 text-blue-500"
                  : "border-gray-300"
              }
            `}
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">
                {" "}
                <Users />
              </span>
              <span className="font-semibold">Create Family</span>
            </div>
            <span className="text-gray-500 text-sm mt-1">Start fresh</span>
          </button>

          {/* Join Family tab */}
          <button
            onClick={() => setActiveTab("join")}
            className={`w-48 p-4 rounded-xl border flex flex-col items-start
              ${
                activeTab === "join"
                  ? "bg-blue-50 border-blue-500  text-blue-500"
                  : "border-gray-300"
              }
            `}
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">
                {" "}
                <Link />{" "}
              </span>
              <span className="font-semibold">Join Family</span>
            </div>
            <span className="text-gray-500 text-sm mt-1">Use invite link</span>
          </button>
        </div>

        {/* Input Form */}
        {activeTab === "create" && (
          <div className="space-y-3">
            <label className="text-gray-800 font-medium">
              {"What's"}your family name?
            </label>

            <input
              type="text"
              placeholder="e.g., The Sharma Family"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={(e) => setFamilyName(e.target.value)}
              value={familyName}
            />
            <Button
              className="w-48"
              onClick={(e) => handleFamilyCreation(e)}
              variant="primary"
              isLoading={isLoading}
              type="button"
              disabled={isLoading}
            >
              {isLoading ? "Creating.." : " Create Family →"}
            </Button>

            <p className="text-gray-500 text-sm mt-1">
              You can invite family members after setup
            </p>
          </div>
        )}

        {activeTab === "join" && (
          <div className="space-y-3">
            <label className="text-gray-800 font-medium">
              Enter invite code
            </label>
            <input
              type="text"
              placeholder="Paste your invite link"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={(e) => setInvitationLink(e.target.value)}
              value={invitationLink}
            />
            {/* <button
              onClick={(e) => handleFamilyCreation(e)}
              className="w-48 bg-blue-600 text-white py-3 rounded-xl text-lg font-medium hover:bg-blue-700 transition"
            >
              Join Family →
            </button> */}

            <Button
              className="w-48"
              onClick={(e) => handleFamilyCreation(e)}
              variant="primary"
              isLoading={isLoading}
              type="button"
              disabled={isLoading}
            >
              {isLoading ? "Joining.." : "Join Family →"}
            </Button>
          </div>
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
