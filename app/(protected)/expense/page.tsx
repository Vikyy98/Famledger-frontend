import MainLayout from "@/app/components/layout/MainLayout";
import { Wallet } from "lucide-react";

export default function ExpensePage() {
  return (
    <MainLayout>
      <div className="h-full p-6 bg-gray-50 min-h-screen flex flex-col items-center justify-center">
        <div className="text-center max-w-md">
          <div className="inline-flex p-4 rounded-full bg-blue-100 mb-4">
            <Wallet className="w-12 h-12 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Expense Management
          </h2>
          <p className="text-gray-600">
            This page will be implemented in Phase 1. Track and manage your
            family expenses here.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
